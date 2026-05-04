import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, TrendingUp, MessageSquare, LogOut, RefreshCw,
  Flame, Thermometer, Snowflake, Zap, BarChart3, Clock,
  Phone, Send, ArrowUpDown, MessageCircle, Settings as SettingsIcon, Save
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  business_type: string | null;
  source: string;
  status: string;
  lead_score: number;
  lead_priority: string;
  lifecycle_stage?: string;
  country: string | null;
  inquiry_topic: string | null;
  created_at: string;
  followup_count: number | null;
  website: string | null;
}

interface ChatMsg {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
}

interface WhatsAppMsg {
  id: string;
  message_id: string | null;
  customer_phone: string;
  customer_name: string | null;
  message_text: string;
  direction: string;
  conversation_status: string;
  detected_intent: string | null;
  created_at: string;
}

const priorityConfig: Record<string, { label: string; color: string; icon: typeof Flame }> = {
  ready: { label: "Ready to Buy", color: "bg-red-100 text-red-700 border-red-200", icon: Zap },
  hot: { label: "Hot Lead", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Flame },
  warm: { label: "Warm Lead", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Thermometer },
  cold: { label: "Cold Lead", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Snowflake },
};

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chats, setChats] = useState<ChatMsg[]>([]);
  const [whatsappMsgs, setWhatsappMsgs] = useState<WhatsAppMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"leads" | "chats" | "whatsapp" | "analytics" | "settings">("leads");
  const [replyPhone, setReplyPhone] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [settings, setSettings] = useState<{
    scoring_weights: Record<string, number>;
    stage_thresholds: Record<string, number>;
    priority_thresholds: Record<string, number>;
  } | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const [leadsRes, chatsRes, waRes, settingsRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("chat_conversations").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("whatsapp_messages").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("crm_settings").select("*").eq("id", "global").maybeSingle(),
    ]);
    if (leadsRes.data) setLeads(leadsRes.data as Lead[]);
    if (chatsRes.data) setChats(chatsRes.data as ChatMsg[]);
    if (waRes.data) setWhatsappMsgs(waRes.data as WhatsAppMsg[]);
    if (settingsRes.data) setSettings({
      scoring_weights: (settingsRes.data as any).scoring_weights ?? {},
      stage_thresholds: (settingsRes.data as any).stage_thresholds ?? {},
      priority_thresholds: (settingsRes.data as any).priority_thresholds ?? {},
    });
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate("/admin/login"); return; }
      supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
        if (!data?.some((r: any) => r.role === "admin")) { navigate("/admin/login"); return; }
        fetchData();
      });
    });

    // Realtime WhatsApp messages
    const channel = supabase
      .channel("whatsapp-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "whatsapp_messages" }, (payload) => {
        setWhatsappMsgs((prev) => [payload.new as WhatsAppMsg, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleScoreUpdate = async (leadId: string, delta: number) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    const newScore = Math.max(0, lead.lead_score + delta);
    await supabase.from("leads").update({ lead_score: newScore }).eq("id", leadId);
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, lead_score: newScore, lead_priority: newScore >= 70 ? "ready" : newScore >= 41 ? "hot" : newScore >= 21 ? "warm" : "cold" } : l));
  };

  const handleSendWhatsApp = async () => {
    if (!replyPhone || !replyText) return;
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("whatsapp-send", {
        body: { to: replyPhone, message: replyText },
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (res.error) {
        console.error("Send error:", res.error);
      } else {
        setReplyText("");
      }
    } catch (e) {
      console.error("Send failed:", e);
    }
    setSending(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    const { error } = await supabase
      .from("crm_settings")
      .update({
        scoring_weights: settings.scoring_weights,
        stage_thresholds: settings.stage_thresholds,
        priority_thresholds: settings.priority_thresholds,
      })
      .eq("id", "global");
    setSavingSettings(false);
    if (error) alert("Save failed: " + error.message);
    else alert("Settings saved.");
  };

  // Analytics
  const totalLeads = leads.length;
  const hotLeads = leads.filter((l) => l.lead_priority === "hot" || l.lead_priority === "ready").length;
  const sourceCounts = leads.reduce((acc, l) => { acc[l.source] = (acc[l.source] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const businessTypeCounts = leads.reduce((acc, l) => { if (l.business_type) acc[l.business_type] = (acc[l.business_type] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topBusinessTypes = Object.entries(businessTypeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const chatSessions = new Set(chats.map((c) => c.session_id)).size;
  const userMessages = chats.filter((c) => c.role === "user").length;

  // WhatsApp analytics
  const waIncoming = whatsappMsgs.filter((m) => m.direction === "incoming").length;
  const waOutgoing = whatsappMsgs.filter((m) => m.direction === "outgoing").length;
  const waUniquePhones = new Set(whatsappMsgs.map((m) => m.customer_phone)).size;
  const waIntents = whatsappMsgs.reduce((acc, m) => {
    if (m.detected_intent) acc[m.detected_intent] = (acc[m.detected_intent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topIntents = Object.entries(waIntents).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Group WhatsApp messages by phone for conversation view
  const waConversations = new Map<string, WhatsAppMsg[]>();
  whatsappMsgs.forEach((msg) => {
    const existing = waConversations.get(msg.customer_phone) || [];
    existing.push(msg);
    waConversations.set(msg.customer_phone, existing);
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchData} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Refresh">
            <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive" aria-label="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Leads" value={totalLeads} />
          <StatCard icon={Flame} label="Hot / Ready" value={hotLeads} accent />
          <StatCard icon={Phone} label="WhatsApp Chats" value={waUniquePhones} />
          <StatCard icon={MessageSquare} label="AI Sessions" value={chatSessions} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(["leads", "whatsapp", "chats", "analytics", "settings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors capitalize ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "whatsapp" ? "WhatsApp" : t}
            </button>
          ))}
        </div>

        {/* Leads Tab */}
        {tab === "leads" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Business</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Source</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Score</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Priority</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const pri = priorityConfig[lead.lead_priority] || priorityConfig.cold;
                    const PriIcon = pri.icon;
                    return (
                      <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{lead.business_type || "—"}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{lead.source}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">{lead.lead_score}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 w-fit ${pri.color}`}>
                            <PriIcon className="w-3 h-3" /> {pri.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                          <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(lead.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => handleScoreUpdate(lead.id, 10)} className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors">+10</button>
                            <button onClick={() => handleScoreUpdate(lead.id, -10)} className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors">-10</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {leads.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No leads yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WhatsApp Tab */}
        {tab === "whatsapp" && (
          <div className="space-y-4">
            {/* Manual Reply Box */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" /> Send WhatsApp Message
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Phone (e.g. 918335870240)"
                  value={replyPhone}
                  onChange={(e) => setReplyPhone(e.target.value)}
                  className="flex-shrink-0 sm:w-48 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSendWhatsApp}
                  disabled={sending || !replyPhone || !replyText}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Send className="w-3 h-3" /> {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>

            {/* Conversations */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Conversations ({waUniquePhones})
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> {waIncoming} in / {waOutgoing} out</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Phone</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Direction</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Message</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Intent</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatsappMsgs.slice(0, 100).map((msg) => (
                      <tr
                        key={msg.id}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${msg.direction === "incoming" ? "bg-primary/[0.02]" : ""}`}
                        onClick={() => { setReplyPhone(msg.customer_phone); }}
                      >
                        <td className="px-4 py-2 font-mono text-xs text-muted-foreground cursor-pointer hover:text-primary">
                          +{msg.customer_phone}
                        </td>
                        <td className="px-4 py-2 text-foreground">{msg.customer_name || "—"}</td>
                        <td className="px-4 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${msg.direction === "incoming" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {msg.direction === "incoming" ? "↓ in" : "↑ out"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-foreground max-w-xs truncate">{msg.message_text}</td>
                        <td className="px-4 py-2">
                          {msg.detected_intent && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent-foreground">{msg.detected_intent}</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            msg.conversation_status === "active" ? "bg-green-100 text-green-700" :
                            msg.conversation_status === "handover" ? "bg-orange-100 text-orange-700" :
                            msg.conversation_status === "waiting" ? "bg-yellow-100 text-yellow-700" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {msg.conversation_status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                    {whatsappMsgs.length === 0 && (
                      <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No WhatsApp messages yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Chats Tab */}
        {tab === "chats" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Session</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Message</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {chats.slice(0, 100).map((msg) => (
                    <tr key={msg.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{msg.session_id.slice(-8)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${msg.role === "user" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {msg.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground max-w-md truncate">{msg.content}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {chats.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No conversations yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {tab === "analytics" && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Top Lead Sources</h3>
              <div className="space-y-3">
                {topSources.map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(count / totalLeads) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
                {topSources.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Business Types</h3>
              <div className="space-y-3">
                {topBusinessTypes.map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${(count / totalLeads) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
                {topBusinessTypes.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Lead Priority Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(priorityConfig).map(([key, cfg]) => {
                  const count = leads.filter((l) => l.lead_priority === key).length;
                  const Icon = cfg.icon;
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${cfg.color}`}>
                        <Icon className="w-3 h-3" /> {cfg.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">WhatsApp Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Unique Conversations</span>
                  <span className="text-lg font-bold text-foreground">{waUniquePhones}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Incoming Messages</span>
                  <span className="text-lg font-bold text-foreground">{waIncoming}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Outgoing Messages</span>
                  <span className="text-lg font-bold text-foreground">{waOutgoing}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">AI Chat Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                  <span className="text-lg font-bold text-foreground">{chatSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">User Messages</span>
                  <span className="text-lg font-bold text-foreground">{userMessages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Messages/Session</span>
                  <span className="text-lg font-bold text-foreground">{chatSessions ? (userMessages / chatSessions).toFixed(1) : 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Top WhatsApp Intents</h3>
              <div className="space-y-3">
                {topIntents.map(([intent, count]) => (
                  <div key={intent} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{intent}</span>
                    <span className="text-sm font-medium text-foreground">{count}</span>
                  </div>
                ))}
                {topIntents.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, accent }: { icon: typeof Users; label: string; value: number; accent?: boolean }) => (
  <div className="bg-card rounded-xl border border-border p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${accent ? "text-accent" : "text-primary"}`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <span className="text-2xl font-bold text-foreground">{value}</span>
  </div>
);

export default AdminDashboard;
