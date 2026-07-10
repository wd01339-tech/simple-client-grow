import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "WhatsApp",
      href: getWhatsAppUrl("general"),
      icon: MessageCircle,
      bgColor: "bg-[#25D366]",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/189bAHVJS1/",
      icon: Facebook,
      title: "Follow us on Facebook",
      bgColor: "bg-[#1877F2]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/freelancedigitalconsultant",
      icon: Instagram,
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
      title: "Follow us on Instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/freelancedigitalconsultant",
      icon: Linkedin,
      bgColor: "bg-[#0A66C2]",
      title: "Connect on LinkedIn",
    },
    {
      name: "Email",
      href: "mailto:consultantb84@gmail.com",
      icon: Mail,
      bgColor: "bg-primary",
    },
  ];

  return (
    <footer className="bg-foreground text-background" role="contentinfo" aria-label="DigitalFreelancer Footer">
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
              Affordable freelance digital consultant helping small businesses, homestays, cafés, and local services 
              grow online through professional website design, Google Business Profile optimization, local SEO, 
              and practical digital marketing — delivered remotely with personal, one-to-one support worldwide.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className={`w-11 h-11 rounded-full ${social.bgColor} flex items-center justify-center hover:scale-110 hover:opacity-85 transition-all duration-300 shadow-lg`}
                  aria-label={social.name}
                  title={(social as any).title || social.name}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <p className="text-background/50 text-sm mt-4">
              Follow us on Facebook for updates, client results & marketing tips
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Explore</h4>
            <nav className="space-y-3" aria-label="Quick navigation links">
              <Link to="/" className="block text-background/70 hover:text-background transition-colors">
                Home
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-background/70 hover:text-background transition-colors">
                About Me
              </Link>
              <a
                href="https://calendly.com/consultantb84/30min"
                aria-label="Book a free 30-minute discovery call"
                rel="noopener"
                className="block text-background/70 hover:text-background transition-colors"
              >
                Book Free Discovery Call
              </a>
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
            <h4 className="font-display font-semibold text-lg mb-4">Digital Services</h4>
            <nav className="space-y-3" aria-label="Digital services links">
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Affordable Website Design
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Digital Marketing Services
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Lead Generation & Social Media
              </Link>
              <Link to="/services" className="block text-background/70 hover:text-background transition-colors">
                Google Business Optimization
              </Link>
              <Link to="/blog" className="block text-background/70 hover:text-background transition-colors">
                SEO Tips & Blog
              </Link>
              <Link to="/pricing" className="block text-background/70 hover:text-background transition-colors">
                Pricing & Packages
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
