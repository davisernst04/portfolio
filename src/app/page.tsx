import Image from "next/image";
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
      <section
        aria-label="Introduction"
        className="flex flex-col-reverse gap-10 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-24"
      >
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Davis Ernst
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Computer Science student at the University of Saskatchewan,
            graduating April 2027. I build full-stack and backend software,
            mostly with TypeScript and Python.
          </p>
        </div>

        <Image
          src="/photos/profile.JPG"
          alt="Portrait of Davis Ernst"
          width={4032}
          height={3024}
          priority
          sizes="(max-width: 640px) 10rem, 12rem"
          className="aspect-[4/5] w-40 shrink-0 rounded-xl object-cover object-[45%_45%] sm:w-48"
        />
      </section>
    </>
  );
}
