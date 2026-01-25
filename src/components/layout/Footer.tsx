import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display font-bold text-xl">DigitalFreelancer</span>
            </div>
            <p className="text-background/70 max-w-md mb-6">
              Helping small businesses grow online through simple websites, Google Business optimization, 
              and practical digital marketing — delivered remotely with a personal touch.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-background/70 hover:text-background transition-colors">
                Home
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-background/70 hover:text-background transition-colors">
                About Me
              </Link>
              <Link to="/free-audit" className="block text-background/70 hover:text-background transition-colors">
                Free Audit
              </Link>
              <Link to="/contact" className="block text-background/70 hover:text-background transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <nav className="space-y-3">
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Website Support
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Digital Marketing
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Lead Generation
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Google Business
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} DigitalFreelancer. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-background/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Remote • Working Worldwide</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-background/60 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/60 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
