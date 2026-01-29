import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { packages } from "@/data/packages";

const comparisonFeatures = [
  { feature: "Website Audit & Report", starter: true, growth: true, monthly: true, premium: true },
  { feature: "Google My Business Setup", starter: true, growth: true, monthly: true, premium: true },
  { feature: "Basic SEO Optimization", starter: true, growth: true, monthly: true, premium: true },
  { feature: "Mobile Responsiveness", starter: true, growth: true, monthly: true, premium: true },
  { feature: "WhatsApp Integration", starter: true, growth: true, monthly: true, premium: true },
  { feature: "Advanced SEO & Keywords", starter: false, growth: true, monthly: false, premium: true },
  { feature: "Lead Generation Forms", starter: false, growth: true, monthly: false, premium: true },
  { feature: "Conversion Optimization", starter: false, growth: true, monthly: true, premium: true },
  { feature: "Monthly Maintenance", starter: false, growth: false, monthly: true, premium: true },
  { feature: "Performance Reports", starter: false, growth: false, monthly: true, premium: true },
  { feature: "Priority Support", starter: false, growth: false, monthly: true, premium: true },
  { feature: "Content Updates", starter: false, growth: false, monthly: "1/mo", premium: "4/mo" },
  { feature: "Competitor Analysis", starter: false, growth: false, monthly: false, premium: true },
  { feature: "Strategy Calls", starter: false, growth: false, monthly: false, premium: true },
];

export const ComparisonTable = () => {
  const renderValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-primary mx-auto" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
    }
    return <span className="text-sm font-medium text-primary">{value}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-semibold">Features</th>
            {packages.map((pkg) => (
              <th key={pkg.id} className="text-center py-4 px-4">
                <div className="space-y-1">
                  <span className={`font-display font-bold ${pkg.popular ? "text-primary" : ""}`}>
                    {pkg.name}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {pkg.priceDisplay}
                    {pkg.priceType === "monthly" && "/mo"}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((row, index) => (
            <tr 
              key={row.feature} 
              className={`border-b border-border/50 ${index % 2 === 0 ? "bg-muted/20" : ""}`}
            >
              <td className="py-3 px-4 text-sm">{row.feature}</td>
              <td className="py-3 px-4 text-center">{renderValue(row.starter)}</td>
              <td className="py-3 px-4 text-center bg-primary/5">{renderValue(row.growth)}</td>
              <td className="py-3 px-4 text-center">{renderValue(row.monthly)}</td>
              <td className="py-3 px-4 text-center">{renderValue(row.premium)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
