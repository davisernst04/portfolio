import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software projects by Davis Ernst — emulators, real-time sports analytics, and full-stack web applications built with TypeScript, Python, and Next.js.",
};

const projects = [
  {
    title: "Game Boy Emulator",
    src: "/photos/typescript_gameboy_emulator.png",
    alt: "Game Boy emulator running in a browser",
    githubLink: "https://github.com/davisernst04/typescript_gameboy_emulator",
    liveLink: "https://emulator-demo.vercel.app",
    technologies: ["TypeScript"],
    description:
      "A Nintendo Game Boy emulator written in TypeScript. Implements the full instruction set with accurate flag handling, I/O, and cycle timing, rendering graphics through a custom Canvas pixel pipeline. Published as an npm package.",
  },
  {
    title: "Real Time Game Analysis",
    src: "/photos/RTGA.jpg",
    alt: "Real time game analysis dashboard",
    githubLink: "https://github.com/ElleOwO/realtimegamestatistics",
    liveLink: null,
    technologies: ["Python", "React", "TypeScript"],
    description:
      "A real-time game analysis dashboard built with the Sports Engineering Club at the University of Saskatchewan for the women's soccer team. Uses fine-tuned object and keypoint detection models to track players during live play. Ongoing.",
  },
  {
    title: "Shadow Basketball Official Page",
    src: "/photos/shadow_basketball.jpg",
    alt: "Shadow Basketball website homepage",
    githubLink:
      "https://github.com/davisernst04/basketball-registration-platform",
    liveLink: "https://basketball-registration-platform.vercel.app/",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
    description:
      "The official website for Shadow Basketball, a youth basketball club in Saskatoon. Handles player registration, tryout management, and team communications, backed by a normalized PostgreSQL schema and deployed on Vercel.",
  },
  {
    title: "Managy",
    src: "/photos/managy.png",
    alt: "Managy management platform interface",
    githubLink: "https://github.com/davisernst04/managy",
    liveLink: null,
    technologies: [
      "Python",
      "Django",
      "Next.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Google Cloud",
    ],
    description:
      "A full-stack management platform built as a group project at the University of Saskatchewan. Features user authentication, role-based access control, event scheduling, and amenity booking, with a Django REST backend and a Next.js frontend deployed on Google Cloud.",
  },
];

export default function Projects() {
  return (
    <div className="py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Projects
      </h1>

      <ul className="mt-10 divide-y divide-border/60">
        {projects.map((project) => (
          <li key={project.title} className="flex gap-5 py-8 first:pt-0">
            <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-md sm:w-36">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 6rem, 9rem"
                className="object-cover object-top"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <div className="flex gap-4 text-sm">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    Code
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                {project.technologies.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
