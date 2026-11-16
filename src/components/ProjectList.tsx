"use client";

import { useState, useId, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import ascendumePreview from "../../public/photos/optimized/ascendume.webp";
import emulatorPreview from "../../public/photos/optimized/typescript_gameboy_emulator.webp";
import rtgaPreview from "../../public/photos/optimized/rtga.webp";
import basketballPreview from "../../public/photos/optimized/shadow_basketball.webp";
import managyPreview from "../../public/photos/optimized/managy.webp";
import {
  SiGithub,
  SiTypescript,
  SiJavascript,
  SiNpm,
  SiReact,
  SiPython,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiGooglecloud,
  SiNextdotjs,
} from "react-icons/si";

export default function ProjectList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imagesNearby, setImagesNearby] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.IntersectionObserver) return;

    // Start low-priority preview requests before a visitor opens a project.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImagesNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={listRef}
      className="project-list list-none m-0 p-0 border-y border-border divide-y divide-border"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const panelId = `${id}-panel-${index}`;

        return (
          <Reveal as="li" key={project.title} className="project-row" delay={index * 35}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="project-trigger flex w-full items-center justify-between gap-4 py-6 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <div className="project-label">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <Plus
                aria-hidden
                className="project-toggle w-6 h-6 shrink-0 text-muted-foreground group-hover:text-foreground"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-label={project.title}
              aria-hidden={!isOpen}
              inert={!isOpen}
              data-open={isOpen}
              className="project-panel"
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div
                    className="project-preview md:col-span-4 relative overflow-hidden rounded-md bg-muted bg-cover bg-top"
                    style={{ backgroundImage: `url("${project.src.blurDataURL}")` }}
                  >
                    <div className="relative aspect-video">
                      <Image
                        fill
                        src={project.src}
                        alt={project.alt}
                        className="object-cover object-top"
                        sizes="(min-width: 1152px) 416px, (min-width: 768px) calc((100vw - 112px) * 0.4), calc((100vw - 32px) * 1.2)"
                        quality={90}
                        placeholder="blur"
                        loading={imagesNearby || isOpen ? "eager" : "lazy"}
                        fetchPriority={isOpen ? "high" : "low"}
                      />
                    </div>
                  </div>

                  <div className="project-details md:col-span-8 flex flex-col gap-5">
                    <div className="text-muted-foreground text-base leading-relaxed">
                      {project.content}
                    </div>

                    <ul className="flex flex-wrap gap-3 list-none m-0 p-0 text-muted-foreground">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech.name}
                          className="flex items-center"
                          title={tech.name}
                        >
                          <span aria-hidden className="text-foreground/70">
                            {tech.icon}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      <Button asChild variant="outline" size="sm" className="motion-button transition-[transform,opacity,background-color,border-color] duration-200 ease-[var(--motion-ease)]">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View the source code for ${project.title} on GitHub (opens in a new tab)`}
                        >
                          <SiGithub aria-hidden className="size-4" />
                          Code
                        </a>
                      </Button>

                      {project.liveLink && (
                        <Button asChild size="sm" className="motion-button transition-[transform,opacity,background-color,border-color] duration-200 ease-[var(--motion-ease)]">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit the live ${project.title} site (opens in a new tab)`}
                          >
                            <ArrowUpRight aria-hidden className="size-4" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

const projects = [
  {
    title: "Game Boy Emulator",
    description: "Individual Project",
    src: emulatorPreview,
    alt: "Game Boy Emulator project preview",
    githubLink: "https://github.com/davisernst04/typescript_gameboy_emulator",
    liveLink: "https://emulator-demo.vercel.app",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
      { name: "JavaScript", icon: <SiJavascript size={22} /> },
      { name: "npm", icon: <SiNpm size={22} /> },
    ],
    content: (
      <p>
        A Nintendo Game Boy emulator built in TypeScript, implementing the full
        instruction set with accurate flag handling, I/O, and cycle timing.
        Renders graphics through a custom tile-based pixel pipeline on the
        HTML5 Canvas and is published as an npm package that runs directly in
        the browser.
      </p>
    ),
  },
  {
    title: "Real Time Game Analysis",
    description: "SPEN Club at USASK",
    src: rtgaPreview,
    alt: "Real Time Game Analysis project preview",
    githubLink: "https://github.com/ElleOwO/realtimegamestatistics",
    liveLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={22} /> },
      { name: "React", icon: <SiReact size={22} /> },
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
    ],
    content: (
      <p>
        A real-time game analysis dashboard built with the Sports Engineering
        Club at USASK for the women&apos;s soccer team. Fine-tuned object and
        keypoint detection models track player positions and movements during
        gameplay, giving coaches actionable insights in real time.
      </p>
    ),
  },
  {
    title: "Shadow Basketball Official Page",
    description: "A website for a youth basketball team",
    src: basketballPreview,
    alt: "Shadow Basketball Official Page project preview",
    githubLink:
      "https://github.com/davisernst04/basketball-registration-platform",
    liveLink: "https://basketball-registration-platform.vercel.app/",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={22} /> },
    ],
    content: (
      <p>
        The official website for Shadow Basketball, a local youth basketball
        club in Saskatoon. Handles player registration, tryout management, and
        team communications, built on a normalized PostgreSQL schema and
        deployed on Vercel.
      </p>
    ),
  },
  {
    title: "Managy",
    description: "Group Project at USASK",
    src: managyPreview,
    alt: "Managy project preview",
    githubLink: "https://github.com/davisernst04/managy",
    liveLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={22} /> },
      { name: "Django", icon: <SiDjango size={22} /> },
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={22} /> },
    ],
    content: (
      <p>
        A full-stack management platform built as a group project at USASK,
        handling authentication, role-based access control, and resource
        management. Features event scheduling, amenity booking, and member
        registration with a Django REST backend, Next.js frontend, and
        PostgreSQL on Google Cloud.
      </p>
    ),
  },
  {
    title: "Ascendume",
    description: "AI-powered résumé builder · In development",
    src: ascendumePreview,
    alt: "Ascendume home screen with the headline Get hired yesterday and a résumé preview",
    githubLink: "https://github.com/davisernst04/ascendume",
    liveLink: null,
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "React", icon: <SiReact size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={22} /> },
    ],
    content: (
      <p>
        An AI-powered résumé builder I&apos;m developing to help job seekers
        turn their experience into polished, ATS-friendly résumés. Combines
        AI bullet enhancement, live LaTeX previews, PDF export, and importing
        existing résumés, with a Next.js frontend and PostgreSQL database.
      </p>
    ),
  },
];
