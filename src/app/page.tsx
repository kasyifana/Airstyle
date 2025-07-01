import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import AIDemos from "@/components/landing/ai-demos";
import Testimonials from "@/components/landing/testimonials";
import Faq from "@/components/landing/faq";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <AIDemos />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
