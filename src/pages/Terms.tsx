import { Layout } from "@/components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Services
              </h2>
              <p>
                I provide freelance digital consulting services including website design, 
                digital marketing, lead generation, and Google Business Profile optimization.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Payment Terms
              </h2>
              <p>
                Payment terms are agreed upon before starting any project. Specific pricing 
                and payment schedules will be outlined in individual project proposals.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Intellectual Property
              </h2>
              <p>
                Upon full payment, you own all deliverables created specifically for your 
                project. I retain the right to showcase work in my portfolio unless 
                otherwise agreed.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Limitation of Liability
              </h2>
              <p>
                While I strive for excellent results, I cannot guarantee specific outcomes 
                such as search rankings or conversion rates, as these depend on many factors 
                beyond my control.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Contact
              </h2>
              <p>
                If you have questions about these Terms, please contact me via WhatsApp 
                or email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
