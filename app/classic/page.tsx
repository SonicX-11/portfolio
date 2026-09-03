import Navbar from "@/components/classic/Navbar";
import Hero from "@/components/classic/Hero";
import About from "@/components/classic/About";
import Projects from "@/components/classic/Projects";
import Showreel from "@/components/classic/Showreel";
import Services from "@/components/classic/Services";
import Software from "@/components/classic/Software";
import Experience from "@/components/classic/Experience";
import Clients from "@/components/classic/Clients";
import Testimonials from "@/components/classic/Testimonials";
import Contact from "@/components/classic/Contact";
import Footer from "@/components/classic/Footer";

export default function ClassicHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Showreel />
        <Services />
        <Software />
        <Experience />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
