import { google } from "@ai-sdk/google";
import { generateText, CoreMessage } from "ai";
import { NextResponse } from "next/server";
import { runOrchestrator } from "@/lib/agents/orchestrator";
import { runResearchAgent } from "@/lib/agents/research";
import { runPlanningAgent } from "@/lib/agents/planning";
import { runActionAgent } from "@/lib/agents/action";
import { runTrackingAgent } from "@/lib/agents/tracking";
import { runMirrorAgent } from "@/lib/agents/mirror";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // In a real app we strict error handling
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await req.json() as { messages: CoreMessage[] };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Step 1: Pass to Orchestrator
    const orchestratorResult = await runOrchestrator(messages);

    // Let's check if the orchestrator invoked the routing tool
    // In Vercel AI SDK, toolCalls are available in the result
    const toolCalls = orchestratorResult.toolCalls;
    
    let finalAgent = "orchestrator";
    let finalContent = orchestratorResult.text;

    if (toolCalls && toolCalls.length > 0) {
      // Find if routeToAgent was called
      const routingTool = toolCalls.find(tc => tc.toolName === "routeToAgent");
      
      if (routingTool && 'agentId' in routingTool.args && 'context' in routingTool.args) {
        const { agentId, context } = routingTool.args as { agentId: string, context: string };
        finalAgent = agentId;

        // Step 2: Route to specific Agent
        let subAgentResult;
        
        switch (agentId) {
          case "research":
            subAgentResult = await runResearchAgent(messages, context);
            break;
          case "planning":
            subAgentResult = await runPlanningAgent(messages, context);
            break;
          case "action":
            subAgentResult = await runActionAgent(messages, context);
            break;
          case "tracking":
            subAgentResult = await runTrackingAgent(messages, context);
            break;
          case "mirror":
            subAgentResult = await runMirrorAgent(messages, context);
            break;
          default:
            subAgentResult = await runPlanningAgent(messages, context); // fallback
        }

        finalContent = subAgentResult.text;
      }
    }

    // Return the response along with the agent identity so UI can show the correct avatar
    return NextResponse.json({
      role: "assistant",
      content: finalContent,
      agentId: finalAgent,
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "İşlem sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
