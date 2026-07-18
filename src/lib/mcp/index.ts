import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listRecentLeads from "./tools/list-recent-leads";
import leadStats from "./tools/lead-stats";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "freelance-digital-consultant-mcp",
  title: "Freelance Digital Consultant",
  version: "0.1.0",
  instructions:
    "Tools for the Freelance Digital Consultant CRM. Use `list_recent_leads` to fetch the latest leads captured by the site and `lead_stats` for a rollup of lead counts by stage and priority. All tools require an admin-authenticated user (RLS enforced).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listRecentLeads, leadStats],
});