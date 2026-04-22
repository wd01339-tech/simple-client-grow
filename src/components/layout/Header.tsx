import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent, ConversionEvents } from "@/lib/analytics";
import { useABTest } from "@/hooks/useABTest";
import { WhatsAppFAQBanner } from "@/components/home/WhatsAppFAQBanner";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { variant, trackClick: trackABClick } = useABTest("header_cta_copy");

  const ctaText = variant === "A" ? "WhatsApp Now" : "Get Instant Help";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">D</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              DigitalFreelancer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="default" className="gap-2 font-semibold" asChild>
              <a
                href="tel:+918335870240"
                onClick={() => trackEvent("call_cta_click", { source: "header_desktop" })}
                title="Call us directly"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
            <Button variant="whatsapp" size="default" className="gap-2 font-semibold animate-whatsapp-pulse" asChild>
              <a
                href="https://wa.me/918335870240?text=Hello%2C%20I%20visited%20your%20website%20and%20want%20to%20know%20more%20about%20your%20services.%20Can%20you%20help%20me%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent(ConversionEvents.WHATSAPP_CLICK, { source: "header_desktop", variant });
                  trackABClick();
                }}
                title="Chat instantly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                {ctaText}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full gap-2 mb-2" asChild>
                    <a
                      href="tel:+918335870240"
                      onClick={() => trackEvent("call_cta_click", { source: "header_mobile" })}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="whatsapp" className="w-full gap-2" asChild>
                    <a
                      href="https://wa.me/918335870240?text=Hello%2C%20I%20visited%20your%20website%20and%20want%20to%20know%20more%20about%20your%20services.%20Can%20you%20help%20me%3F"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackEvent(ConversionEvents.WHATSAPP_CLICK, { source: "header_mobile", variant });
                        trackABClick();
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {ctaText}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
      <WhatsAppFAQBanner />
    </>
  );
};
