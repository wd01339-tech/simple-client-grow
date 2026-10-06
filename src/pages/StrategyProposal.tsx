import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useUTMTracking } from "@/hooks/useUTMTracking";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
  { value: "ai-automation", label: "AI automation" },
  { value: "web-development", label: "Web development" },
  { value: "local-seo", label: "Local SEO" },
  { value: "conversion-funnels", label: "Conversion funnels" },
];

const initialFormData = {
  name: "",
  email: "",
  businessName: "",
  website: "",
  industry: "",
  audience: "",
  bottlenecks: "",
  revenueGoals: "",
  budget: "",
  timeline: "",
};

const escapeEmailText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const StrategyProposal = () => {
  const utmParams = useUTMTracking();
  const [formData, setFormData] = useState(initialFormData);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notificationFailed, setNotificationFailed] = useState(false);

  const setField = (field: keyof typeof initialFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleService = (service: string, checked: boolean | "indeterminate") => {
    setSelectedServices((current) =>
      checked === true
        ? [...current, service].filter((value, index, values) => values.indexOf(value) === index)
        : current.filter((value) => value !== service),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedServices.length === 0) {
      toast.error("Choose at least one area you would like help with.");
      return;
    }

    setIsSubmitting(true);
    const values = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim(),
      website: formData.website.trim(),
      industry: formData.industry.trim(),
      audience: formData.audience.trim(),
      bottlenecks: formData.bottlenecks.trim(),
      revenueGoals: formData.revenueGoals.trim(),
      budget: formData.budget.trim(),
      timeline: formData.timeline.trim(),
    };
    const serviceLabels = selectedServices
      .map((service) => serviceOptions.find((option) => option.value === service)?.label)
      .filter((label): label is string => Boolean(label));
    const details = [
      `Business: ${values.businessName || "Not provided"}`,
      `Website or social profile: ${values.website || "Not provided"}`,
      `Industry: ${values.industry}`,
      `Audience: ${values.audience}`,
      `Challenges: ${values.bottlenecks}`,
      `Revenue goals: ${values.revenueGoals}`,
      `Requested support: ${serviceLabels.join(", ")}`,
      `Approximate budget: ${values.budget || "Not provided"}`,
      `Timeline: ${values.timeline || "Not provided"}`,
    ];

    try {
      const { error } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        company: values.businessName || null,
        website: values.website || null,
        business_type: values.industry,
        subject: "Strategy proposal request",
        message: details.join("\n"),
        notes: `Requested support: ${serviceLabels.join(", ")}`,
        source: "strategy-proposal",
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      if (error) throw error;

      const safeDetails = details.map(escapeEmailText).join("\n");
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: values.name,
          email: values.email,
          subject: "Strategy proposal request",
          message: safeDetails,
          source: "Strategy Proposal Page",
        },
      });

      if (emailError) {
        console.error("Strategy proposal notification failed:", emailError);
        setNotificationFailed(true);
        toast.error("Your request is saved, but the email notification could not be sent.");
      } else {
        setNotificationFailed(false);
        toast.success("Your proposal request has been sent.");
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
      setSelectedServices([]);
    } catch (error) {
      console.error("Error submitting strategy proposal:", error);
      toast.error("We couldn't submit your request. Please try again or email consultantb84@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead page="strategy-proposal" />
      <section className="pt-32 pb-12 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Strategy proposal
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              A growth plan built around your business.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Share your goals and current challenges. I’ll review the details and follow up about a tailored strategy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="container mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] lg:px-8">
          <div>
            {isSubmitted ? (
              <div className="border-t border-border py-10">
                <CheckCircle className="h-10 w-10 text-primary" />
                <h2 className="mt-5 font-display text-2xl font-bold">Thanks, {formData.name || "your request is in"}.</h2>
                <p className="mt-3 text-muted-foreground">
                  Your proposal enquiry has been saved. I’ll be in touch at the email address you provided.
                </p>
                {notificationFailed && (
                  <p className="mt-4 text-sm text-destructive">
                    The enquiry is saved, but the email notification could not be confirmed. For a direct follow-up, email consultantb84@gmail.com.
                  </p>
                )}
                <Button className="mt-6" variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-9">
                <fieldset className="space-y-5">
                  <legend className="mb-5 font-display text-xl font-semibold">About you and your business</legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="proposal-name">Your name</Label>
                      <Input id="proposal-name" autoComplete="name" maxLength={100} required value={formData.name} onChange={(event) => setField("name", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-email">Email address</Label>
                      <Input id="proposal-email" type="email" autoComplete="email" maxLength={255} required value={formData.email} onChange={(event) => setField("email", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-business">Business name</Label>
                      <Input id="proposal-business" autoComplete="organization" maxLength={150} value={formData.businessName} onChange={(event) => setField("businessName", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-website">Website or social profile</Label>
                      <Input id="proposal-website" type="url" maxLength={500} placeholder="https://" value={formData.website} onChange={(event) => setField("website", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-industry">Industry</Label>
                      <Input id="proposal-industry" maxLength={120} required value={formData.industry} onChange={(event) => setField("industry", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-audience">Who do you serve?</Label>
                      <Input id="proposal-audience" maxLength={300} required value={formData.audience} onChange={(event) => setField("audience", event.target.value)} />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="space-y-5">
                  <legend className="mb-5 font-display text-xl font-semibold">Goals and challenges</legend>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-challenges">What is getting in the way of growth?</Label>
                    <Textarea id="proposal-challenges" maxLength={2000} required rows={4} value={formData.bottlenecks} onChange={(event) => setField("bottlenecks", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-goals">What would you like to achieve?</Label>
                    <Textarea id="proposal-goals" maxLength={2000} required rows={4} value={formData.revenueGoals} onChange={(event) => setField("revenueGoals", event.target.value)} />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend id="proposal-services-label" className="font-display text-xl font-semibold">Areas you’re interested in</legend>
                  <div role="group" aria-labelledby="proposal-services-label" className="grid gap-3 sm:grid-cols-2">
                    {serviceOptions.map((option) => (
                      <div key={option.value} className="flex items-center gap-3">
                        <Checkbox
                          id={`proposal-${option.value}`}
                          checked={selectedServices.includes(option.value)}
                          onCheckedChange={(checked) => toggleService(option.value, checked)}
                        />
                        <Label htmlFor={`proposal-${option.value}`} className="cursor-pointer font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="space-y-5">
                  <legend className="mb-5 font-display text-xl font-semibold">Investment and timing</legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="proposal-budget">Approximate budget (optional)</Label>
                      <Input id="proposal-budget" maxLength={100} placeholder="Share an amount or range" value={formData.budget} onChange={(event) => setField("budget", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposal-timeline">Preferred timeline (optional)</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setField("timeline", value)}>
                        <SelectTrigger id="proposal-timeline" aria-label="Preferred timeline">
                          <SelectValue placeholder="Choose a timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="As soon as possible">As soon as possible</SelectItem>
                          <SelectItem value="Within one month">Within one month</SelectItem>
                          <SelectItem value="Within one to three months">Within one to three months</SelectItem>
                          <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </fieldset>

                <div className="border-t border-border pt-6">
                  <Button type="submit" size="lg" variant="hero" disabled={isSubmitting}>
                    {isSubmitting ? "Sending request…" : "Request my proposal"}
                    <ArrowRight aria-hidden="true" />
                  </Button>
                  <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                    Your details will be used to respond to this enquiry.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="h-fit border-t border-border pt-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-semibold">A thoughtful first conversation</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The details you share help shape a practical proposal around your audience, priorities, and goals.
            </p>
            <a href="mailto:consultantb84@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Mail className="h-4 w-4" />
              consultantb84@gmail.com
            </a>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default StrategyProposal;