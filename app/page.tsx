import { Cards } from "@/components/sections/Cards";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { System } from "@/components/sections/System";
import { UrlBar } from "@/components/sections/UrlBar";
import { MILY_TWEAKS_DEFAULT } from "@/lib/mily-tweaks";

export default function HomePage() {
  const { name, fromName } = MILY_TWEAKS_DEFAULT;

  return (
    <main className="page">
      <UrlBar />
      <Hero name={name} />
      <Cards />
      <System />
      <Footer name={name} fromName={fromName} />
    </main>
  );
}
