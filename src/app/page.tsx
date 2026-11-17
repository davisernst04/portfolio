import { AuroraBackground } from "@/components/ui/aurora-background";
import NavigationBar from "@/components/NavigationBar";
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
      <NavigationBar />
      <AuroraBackground className="h-auto min-h-screen items-stretch justify-start text-foreground">
        <div className="relative z-10">
          <HeroSection />
          <ProjectsSection />
          <Footer />
        </div>
      </AuroraBackground>
    </>
  );
}
