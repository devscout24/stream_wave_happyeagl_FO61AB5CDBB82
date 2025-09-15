import Feature from "./_components/Feature";
import Footer from "./_components/Footer";
import { features, portals } from "./data/feature";

export default function About() {
  return (
    <main className="space-y-10 md:space-y-16 lg:space-y-24">
      <Feature
        title="What Makes our AI Smarter"
        description="More than just chat — it understands context, learns with you, and
            helps you get real work done."
        features={features}
      />

      <Feature
        title="What Makes Our Portal Better"
        description="You can not only get any of your legal questions answered, you can also find local legal help."
        features={portals}
      />
      {/* <Testimonials />
      <SmarterConversations /> */}
      <Footer />
    </main>
  );
}
