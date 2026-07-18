import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, MessageCircle, CalendarCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo/SEOHead";
import { packages } from "@/data/packages";
import { recordConversion } from "@/lib/conversions";
import { toast } from "sonner";

const DummyPayment = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package") || "growth";
  const method = searchParams.get("method") || "card";
  const pkg = packages.find((item) => item.id === packageId) || packages[1];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [booking, setBooking] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    if (!name || !email) {
      toast.error("Please enter your name and email");
      return;
    }
    setPaying(true);
    await recordConversion({
      event_type: "payment_completed",
      lead: {
        name,
        email,
        phone,
        source: "dummy_payment",
        inquiry_topic: pkg.name,
      },
      attribution: { package_id: pkg.id, package_name: pkg.name, method },
      metadata: { price: pkg.priceDisplay, price_type: pkg.priceType },
    });
    setPaying(false);
    setPaid(true);
    toast.success(`Payment confirmed — ${pkg.name} (demo). Lead moved to Client stage.`);
  };

  const handleBookConsultation = async () => {
    if (!name || !email) {
      toast.error("Please enter your name and email");
      return;
    }
    setBooking(true);
    await recordConversion({
      event_type: "consultation_booked",
      lead: {
        name,
        email,
        phone,
        source: "dummy_payment_consultation",
        inquiry_topic: pkg.name,
      },
      attribution: { package_id: pkg.id, package_name: pkg.name },
    });
    setBooking(false);
    toast.success("Consultation booked — lead moved to Proposal Sent.");
  };

  return (
    <Layout whatsappIntent="pricing">
      <SEOHead page="pricing" />
      <section className="pt-32 pb-20 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Button variant="ghost" className="mb-8 gap-2" asChild>
            <Link to="/pricing">
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-lg"
            >
              <Badge className="mb-5 gap-2" variant="secondary">
                <Lock className="w-3.5 h-3.5" />
                Dummy Secure Checkout
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                Complete Payment for {pkg.name}
              </h1>
              <p className="text-muted-foreground mb-8">
                This is a demo payment page connected to the pricing section. Replace it with a live gateway when you are ready to accept real payments.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Your name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="jane@example.com"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone (optional)</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..."
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Card number</label>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-muted-foreground">
                    <CreditCard className="w-5 h-5" />
                    4242 4242 4242 4242
                  </div>
                </div>
              </div>

              <Button variant="gradient" size="xl" className="w-full mt-8 gap-2" onClick={handlePay} disabled={paying || paid}>
                <CheckCircle2 className="w-5 h-5" />
                {paid ? "Payment Confirmed ✓" : paying ? "Processing..." : `Pay ${pkg.priceDisplay}${pkg.priceType === "monthly" ? "/month" : ""} — Demo`}
              </Button>

              <Button variant="outline" size="lg" className="w-full mt-3 gap-2" onClick={handleBookConsultation} disabled={booking}>
                <CalendarCheck className="w-5 h-5" />
                {booking ? "Booking..." : "Book a Consultation Instead"}
              </Button>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm text-muted-foreground mb-2">Selected package</p>
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5 mb-5">
                <div>
                  <h2 className="font-display text-2xl font-bold">{pkg.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold">{pkg.priceDisplay}</p>
                  <p className="text-xs text-muted-foreground">{pkg.priceType === "monthly" ? "monthly" : "one-time"}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground mb-6">
                <p>Payment method: <span className="text-foreground font-medium capitalize">{method}</span></p>
                <p>Invoice: Sent after payment confirmation</p>
                <p>Support: WhatsApp guidance included</p>
              </div>

              <Button variant="outline" className="w-full gap-2" asChild>
                <a
                  href="https://calendly.com/consultantb84/30min?utm_source=website&utm_medium=cta_button&utm_campaign=discovery_call&utm_term=dummy_payment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Book Free Discovery Call
                </a>
              </Button>
            </motion.aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DummyPayment;