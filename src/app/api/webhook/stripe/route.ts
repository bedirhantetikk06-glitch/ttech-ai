import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        
        // This is where we link the user ID we passed in metadata
        const userId = session.metadata.userId;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        // Verify if subscription exists
        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (existingSub) {
          await supabase
            .from("subscriptions")
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan_tier: "pro", // Hardcoded MVP mapping to pro
              status: "active",
              updated_at: new Date().toISOString()
            })
            .eq("user_id", userId);
        } else {
          await supabase
            .from("subscriptions")
            .insert({
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan_tier: "pro",
              status: "active",
            });
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        
        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            plan_tier: "free",
            updated_at: new Date().toISOString()
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
