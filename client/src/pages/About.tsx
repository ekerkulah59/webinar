import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({
    title: "About Emmanuel Kerkulah",
    description:
      "Meet Emmanuel Kerkulah, founder of EaseIntoAI in Smyrna, Delaware. Practical, plain-language AI support built around your small business.",
    type: "website",
  });
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <AboutSection standalone />
      </main>
      <Footer />
    </div>
  );
}
