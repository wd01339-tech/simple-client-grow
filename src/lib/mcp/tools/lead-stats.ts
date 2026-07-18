import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "lead_stats",
  title: "Lead stats",
  description: "Return counts of leads grouped by stage and by priority (admin only).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("leads")
      .select("stage, lead_priority");
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    const byStage: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    for (const row of data ?? []) {
      const stage = (row as any).stage ?? "unknown";
      const priority = (row as any).lead_priority ?? "unknown";
      byStage[stage] = (byStage[stage] ?? 0) + 1;
      byPriority[priority] = (byPriority[priority] ?? 0) + 1;
    }
    const summary = { total: data?.length ?? 0, by_stage: byStage, by_priority: byPriority };
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: summary,
    };
  },
});