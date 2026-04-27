import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo/SEOHead";
import { packages } from "@/data/packages";

const DummyPayment = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package") || "growth";
  const method = searchParams.get("method") || "card";
  const pkg = packages.find((item) => item.id === packageId) || packages[1];

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
                <div>
                  <label className="text-sm font-medium">Card number</label>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-muted-foreground">
                    <CreditCard className="w-5 h-5" />
                    4242 4242 4242 4242
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiry</label>
                    <div className="mt-2 rounded-xl border border-border bg-background px-4 py-3 text-muted-foreground">12 / 30</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVC</label>
                    <div className="mt-2 rounded-xl border border-border bg-background px-4 py-3 text-muted-foreground">123</div>
                  </div>
                </div>
              </div>

              <Button variant="gradient" size="xl" className="w-full mt-8 gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Pay {pkg.priceDisplay}{pkg.priceType === "monthly" ? "/month" : ""} — Demo
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
                <a href={`https://wa.me/918335870240?text=${encodeURIComponent(pkg.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Ask Before Paying
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