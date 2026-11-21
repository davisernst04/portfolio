import { AuroraBackground } from "@/components/ui/aurora-background";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import Footer from "@/components/home/Footer";
import {
  generatePersonSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <AuroraBackground className="h-dvh items-stretch justify-start overflow-hidden text-foreground">
        <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col justify-center px-4 py-[clamp(0.75rem,4dvh,2.5rem)] [@media(max-height:420px)]:py-2.5">
          <HeroSection />
          <ProjectsSection />
          <Footer />
        </div>
      </AuroraBackground>
    </>
  );
}
