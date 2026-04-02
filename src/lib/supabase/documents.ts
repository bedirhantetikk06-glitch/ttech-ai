import { createClient } from "./server";

export async function createDocument(
  title: string,
  content: string,
  folder: string,
  tags: string[] = []
) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        user_id: user.id,
        title,
        content,
        folder,
        tags,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating document:", error);
    throw new Error("Failed to create document");
  }

  return data;
}

export async function getDocuments(folder?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (folder && folder !== "all") {
    query = query.eq("folder", folder);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching documents:", error);
    return [];
  }

  return data;
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("documents").delete().eq("id", id);
  if (error) {
    console.error("Error deleting document:", error);
    return false;
  }
  return true;
}
