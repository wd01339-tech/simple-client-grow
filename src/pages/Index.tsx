import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Portfolio } from "@/components/home/Portfolio";
import { ClientLogos } from "@/components/home/ClientLogos";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { Testimonials } from "@/components/home/Testimonials";
import { Packages } from "@/components/home/Packages";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ClientLogos />
      <Services />
      <Packages />
      <Portfolio />
      <About />
      <LeadMagnet />
      <Testimonials />
    </Layout>
  );
};

export default Index;
