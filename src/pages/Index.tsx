import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Portfolio } from "@/components/home/Portfolio";
import { ClientLogos } from "@/components/home/ClientLogos";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ClientLogos />
      <Services />
      <Portfolio />
      <About />
      <LeadMagnet />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
