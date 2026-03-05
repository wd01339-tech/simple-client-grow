import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, whatsAppFlowOptions, type WhatsAppIntent } from "@/lib/whatsapp";
import { trackEvent, ConversionEvents } from "@/lib/analytics";

interface SmartWhatsAppButtonProps {
  defaultIntent?: WhatsAppIntent;
}

/**
 * Smart WhatsApp Floating Button with Quick Options
 */
export const SmartWhatsAppButton = ({ defaultIntent = "general" }: SmartWhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (intent: WhatsAppIntent) => {
    trackEvent(ConversionEvents.WHATSAPP_CLICK, { intent, source: "floating_button" });
    window.open(getWhatsAppUrl(intent), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Options Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-72 bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">Hi! How can I help?</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">
                Select an option to start a conversation
              </p>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
              {whatsAppFlowOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.intent)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 border border-transparent transition-all text-left group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center text-sm font-semibold">
                    {option.id}
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-[#25D366] transition-colors">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Direct Message Option */}
            <div className="px-3 pb-3">
              <button
                onClick={() => handleOptionClick(defaultIntent)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#20BD5C] transition-colors"
              >
                <Send className="w-4 h-4" />
                Send a Direct Message
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-muted/30 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                ✨ I usually respond within a few hours
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-110 transition-transform"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close WhatsApp menu" : "Open WhatsApp chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-glow" />
      </motion.button>
    </>
  );
};

export default SmartWhatsAppButton;
