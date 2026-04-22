import { motion } from "framer-motion";

import clientLogo1 from "@/assets/client-logo-1.png";
import clientLogo2 from "@/assets/client-logo-2.png";
import clientLogo3 from "@/assets/client-logo-3.png";
import clientLogo4 from "@/assets/client-logo-4.png";
import clientLogo5 from "@/assets/client-logo-5.png";
import clientLogo6 from "@/assets/client-logo-6.png";

const clients = [
  { name: "Hotel Boutique", logo: clientLogo1 },
  { name: "Coffee House", logo: clientLogo2 },
  { name: "Wellness Spa", logo: clientLogo3 },
  { name: "Fine Dining", logo: clientLogo4 },
  { name: "Retail Shop", logo: clientLogo5 },
  { name: "Real Estate", logo: clientLogo6 },
];

// Double the array for seamless infinite scroll
const duplicatedClients = [...clients, ...clients];

export const ClientLogos = () => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden" aria-label="Trusted Client Brands">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Trusted By Small Businesses Worldwide
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-3" id="client-portfolio">
            Hotels, Cafés & Local Services We've Helped Grow Online
          </h2>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: [0, -50 * clients.length * 4],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
