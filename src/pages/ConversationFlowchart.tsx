import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Bot, MessageCircle, ArrowDown, ArrowRight, CreditCard, UserCheck, Search, BarChart3 } from "lucide-react";

const flowSteps = [
  {
    id: "visitor",
    title: "Website Visitor",
    description: "User lands on any page",
    icon: Search,
    color: "bg-muted text-muted-foreground",
    branches: ["ai-chat", "whatsapp"],
  },
  {
    id: "ai-chat",
    title: "AI Chat Widget",
    description: "Floating bot button (bottom-left)",
    icon: Bot,
    color: "bg-primary/10 text-primary",
    details: [
      "Answers questions using SEO knowledge base",
      "Detects intent: pricing, audit, consultation, services",
      "Recommends packages with direct payment links",
      "Logs conversations to database for analytics",
    ],
    branches: ["lead-qualify", "payment"],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Menu",
    description: "Floating green button (bottom-right)",
    icon: MessageCircle,
    color: "bg-[#25D366]/10 text-[#25D366]",
    details: [
      "7 intent options: Audit, Website, GMB, Marketing, Pricing, General, Consultant",
      "High-intent options trigger qualification flow",
      "Low-intent options open WhatsApp directly",
    ],
    branches: ["lead-qualify"],
  },
  {
    id: "lead-qualify",
    title: "Lead Qualification",
    description: "4-step interactive form",
    icon: UserCheck,
    color: "bg-accent/10 text-accent",
    details: [
      "Step 1: Business Type (8 categories)",
      "Step 2: Website URL (optional)",
      "Step 3: Country (8 regions)",
      "Step 4: Name & Email",
      "Auto-scores lead: Audit +20, Pricing +15, Consultation +30",
      "Saves to CRM with UTM parameters",
    ],
    branches: ["crm", "whatsapp-handoff"],
  },
  {
    id: "payment",
    title: "Payment Flow",
    description: "AI recommends package → user pays",
    icon: CreditCard,
    color: "bg-secondary/10 text-secondary",
    details: [
      "Chatbot provides /pricing?package=ID links",
      "Stripe, PayPal, Razorpay gateways",
      "Post-payment: invoice + WhatsApp onboarding",
    ],
    branches: ["client"],
  },
  {
    id: "crm",
    title: "CRM Pipeline",
    description: "Automated lead management",
    icon: BarChart3,
    color: "bg-primary/10 text-primary",
    details: [
      "Lead scoring: Cold (0-20) → Warm (21-40) → Hot (41-70) → Ready (70+)",
      "Automated follow-up emails: 24h, 48h, 72h",
      "Admin dashboard: leads, chats, analytics",
      "Score increases per action (audit, pricing, consultation)",
    ],
    branches: ["payment"],
  },
];

const funnelStages = [
  { label: "Visitor", desc: "Lands on website", width: "w-full" },
  { label: "Engagement", desc: "AI Chat or WhatsApp", width: "w-[90%]" },
  { label: "Qualification", desc: "Business details captured", width: "w-[75%]" },
  { label: "Free Audit", desc: "Complimentary review", width: "w-[60%]" },
  { label: "Consultation", desc: "Personalized recommendation", width: "w-[45%]" },
  { label: "Purchase", desc: "Package payment", width: "w-[30%]" },
  { label: "Client", desc: "Onboarding & delivery", width: "w-[20%]" },
];

const ConversationFlowchart = () => {
  return (
    <Layout>
      <SEOHead
        customSEO={{
          title: "Conversation Flowchart — System Architecture",
          description: "Visual documentation of the AI chatbot paths, WhatsApp qualification flows, and conversion funnels.",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Conversation System Architecture
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visual documentation of all chatbot paths, lead qualification flows, CRM pipeline, and conversion funnels powering the 24/7 digital assistant.
          </p>
        </div>

        {/* System Components */}
        <section className="space-y-8">
          <h2 className="text-2xl font-display font-bold text-foreground">System Components</h2>
          <div className="grid gap-6">
            {flowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="bg-card rounded-xl border border-border p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.details && (
                        <ul className="mt-3 space-y-1.5">
                          {step.details.map((detail, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                      {step.branches && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs text-muted-foreground">Leads to →</span>
                          {step.branches.map((b) => (
                            <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {flowSteps.find((s) => s.id === b)?.title || b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sales Funnel */}
        <section className="space-y-8">
          <h2 className="text-2xl font-display font-bold text-foreground">Global Sales Funnel</h2>
          <div className="space-y-2 flex flex-col items-center">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className={`${stage.width} transition-all`}>
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg px-5 py-3 flex items-center justify-between border border-primary/10">
                  <div>
                    <span className="font-semibold text-foreground text-sm">{stage.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{stage.desc}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Stage {i + 1}</span>
                </div>
                {i < funnelStages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lead Scoring Model */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Lead Scoring Model</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-3">Score Actions</h3>
              <div className="space-y-2">
                {[
                  { action: "Consultation Request", score: "+30" },
                  { action: "Free Audit Request", score: "+20" },
                  { action: "Pricing Inquiry", score: "+15" },
                  { action: "Service Page Visit", score: "+5" },
                ].map((item) => (
                  <div key={item.action} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.action}</span>
                    <span className="font-mono font-semibold text-primary">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-3">Priority Levels</h3>
              <div className="space-y-2">
                {[
                  { range: "0–20", label: "Cold Lead", color: "text-blue-500" },
                  { range: "21–40", label: "Warm Lead", color: "text-yellow-500" },
                  { range: "41–70", label: "Hot Lead", color: "text-orange-500" },
                  { range: "70+", label: "Ready to Buy", color: "text-red-500" },
                ].map((item) => (
                  <div key={item.range} className="flex justify-between items-center text-sm">
                    <span className={`font-semibold ${item.color}`}>{item.label}</span>
                    <span className="font-mono text-muted-foreground">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot Intent Detection */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">AI Intent Detection</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">User Keywords</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Detected Intent</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Bot Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { keywords: "audit, review, check", intent: "free-audit", action: "Suggest /free-audit page" },
                  { keywords: "price, cost, how much", intent: "pricing", action: "Share packages with payment links" },
                  { keywords: "consult, call, talk", intent: "consultation", action: "Offer WhatsApp consultation" },
                  { keywords: "website, build, develop", intent: "website-dev", action: "Recommend Starter/Growth package" },
                  { keywords: "google, gmb, maps", intent: "gmb-help", action: "Explain GMB optimization" },
                  { keywords: "marketing, seo, social", intent: "digital-marketing", action: "Suggest digital marketing services" },
                ].map((row) => (
                  <tr key={row.intent} className="border-b border-border/50">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.keywords}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{row.intent}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Follow-up Automation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Automated Follow-up Sequence</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { time: "24h", subject: "Thank You", desc: "Acknowledgment + free tips" },
              { time: "48h", subject: "Helpful Resources", desc: "Blog post + case study" },
              { time: "72h", subject: "Special Offer", desc: "Limited-time discount CTA" },
            ].map((step, i) => (
              <div key={step.time} className="flex-1 flex items-start gap-3">
                <div className="bg-card rounded-xl border border-border p-4 flex-1">
                  <div className="text-xs font-mono text-primary mb-1">{step.time}</div>
                  <div className="font-semibold text-foreground text-sm">{step.subject}</div>
                  <div className="text-xs text-muted-foreground mt-1">{step.desc}</div>
                </div>
                {i < 2 && <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-6 hidden sm:block flex-shrink-0" />}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Cron job runs hourly. Follow-ups stop automatically when lead replies or reaches max count (5).
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default ConversationFlowchart;
