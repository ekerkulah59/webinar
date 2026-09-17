import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
export default function PageLayout({
  title,
  description,
  eyebrow,
  heading,
  children,
}: {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
}) {
  useSEO({ title, description, type: "website" });
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="container py-14 md:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.035em] md:text-5xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
