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
      <main className="flex-grow">
        <HeroSection />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  );
}
