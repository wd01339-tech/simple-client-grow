import { Layout } from "@/components/layout/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly, such as your name, email address, 
                and any messages you send through our contact forms or WhatsApp.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use your information to respond to your inquiries, provide our services, 
                and improve your experience. We never sell your personal data to third parties.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us via 
                WhatsApp or email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;
