import { HeroServicesTransition } from "@/components/HeroServicesTransition";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroServicesTransition />
      <Footer />
    </main>
  );
}