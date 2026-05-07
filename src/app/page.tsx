import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Pillars from "@/components/Pillars";
import Differentiator from "@/components/Differentiator";
import Testimonials from "@/components/Testimonials";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Product />
        <Pillars />
        <Differentiator />
        <Testimonials />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
