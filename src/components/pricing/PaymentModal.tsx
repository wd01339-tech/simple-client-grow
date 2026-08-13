import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Shield, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Package } from "@/data/packages";
import { buildCalendlyUrl, trackCalendlyClick } from "@/lib/calendly";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: Package | null;
}

const paymentGateways = [
  {
    id: "stripe",
    name: "Pay with Card",
    description: "Visa, Mastercard, Amex, Apple Pay, Google Pay",
    icon: "💳",
    recommended: true,
  },
  {
    id: "paypal",
    name: "Pay with PayPal",
    description: "PayPal balance or linked cards",
    icon: "🅿️",
    recommended: false,
  },
  {
    id: "razorpay",
    name: "Pay with Razorpay",
    description: "International cards & more options",
    icon: "🔷",
    recommended: false,
  },
];

export const PaymentModal = ({ isOpen, onClose, pkg }: PaymentModalProps) => {
  const [selectedGateway, setSelectedGateway] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!pkg) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Route to Calendly Discovery Call instead of WhatsApp
    const calendlyUrl = buildCalendlyUrl({ source: "payment_modal", content: pkg?.name });
    trackCalendlyClick({ source: "payment_modal", content: pkg?.name });
    setTimeout(() => {
      window.open(calendlyUrl, "_blank");
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold">Complete Your Purchase</h3>
                <p className="text-sm text-muted-foreground mt-1">Secure checkout</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Package Summary */}
            <div className="p-6 bg-muted/30 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{pkg.name}</p>
                  <p className="text-sm text-muted-foreground">{pkg.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold">{pkg.priceDisplay}</p>
                  <p className="text-xs text-muted-foreground">
                    {pkg.priceType === "monthly" ? "per month" : "one-time"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="p-6 space-y-4">
              <p className="text-sm font-medium mb-3">Choose payment method:</p>
              
              <div className="space-y-3">
                {paymentGateways.map((gateway) => (
                  <button
                    key={gateway.id}
                    onClick={() => setSelectedGateway(gateway.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                      selectedGateway === gateway.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl">{gateway.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{gateway.name}</span>
                        {gateway.recommended && (
                          <Badge variant="secondary" className="text-xs">Recommended</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{gateway.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedGateway === gateway.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    }`}>
                      {selectedGateway === gateway.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pay Button */}
              <Button
                variant="gradient"
                size="xl"
                className="w-full gap-2 mt-6"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay {pkg.priceDisplay} {pkg.priceType === "monthly" && "/ month"}
                  </>
                )}
              </Button>

              {/* Discovery Call Alternative */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Prefer to talk first?</p>
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <a
                    href={buildCalendlyUrl({ source: "payment_modal_footer" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCalendlyClick({ source: "payment_modal_footer" })}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Free Discovery Call Before Paying
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="p-6 pt-0">
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>256-bit SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Invoice emailed within minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>WhatsApp support included</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                No hidden fees · 7-day satisfaction guarantee · Cancel monthly anytime
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
