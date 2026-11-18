"use client";

import { useState, useId, useEffect, useRef, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ascendumePreview from "../../public/photos/optimized/ascendume.webp";
import emulatorPreview from "../../public/photos/optimized/typescript_gameboy_emulator.webp";
import rtgaPreview from "../../public/photos/optimized/rtga.webp";
import basketballPreview from "../../public/photos/optimized/shadow-basketball-hero.webp";
import managyPreview from "../../public/photos/optimized/managy-hero.webp";
import yeGuesserPreview from "../../public/photos/optimized/ye-guesser-home.webp";
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
      className="project-list list-none m-0 -mx-3 md:-mx-5 p-0"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const panelId = `${id}-panel-${index}`;

        return (
          <li key={project.title} className="project-row px-3 md:px-5">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="project-trigger flex w-full items-center justify-between gap-4 py-6 text-left group cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
                <div className="pb-6 pt-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  {project.src && (
                    <div
                      className="project-preview md:col-span-4 relative overflow-hidden rounded-md bg-muted bg-cover bg-top"
                      style={{ backgroundImage: `url("${project.src.blurDataURL}")` }}
                    >
                      <div className="relative aspect-video">
                        <Image
                          fill
                          src={project.src}
                          alt={project.alt ?? `${project.title} preview`}
                          className="object-cover object-top"
                          sizes="(min-width: 1152px) 360px, (min-width: 768px) calc((100vw - 112px) / 3), calc(100vw - 32px)"
                          quality={90}
                          placeholder="blur"
                          loading={imagesNearby || isOpen ? "eager" : "lazy"}
                          fetchPriority={isOpen ? "high" : "low"}
                        />
                      </div>
                    </div>
                  )}
                  <div className={`project-details ${project.src ? "md:col-span-8" : "md:col-span-12"} flex flex-col gap-5`}>
                    <div className="text-muted-foreground text-base leading-relaxed">
                      {project.content}
                    </div>

                    <ul className="project-tech flex flex-wrap gap-3 list-none m-0 p-0 text-muted-foreground">
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

                    <div className="flex flex-wrap gap-3">
                      {project.githubLink && (
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
                      )}
                      {project.sources?.map((source) => (
                        <Button key={source.href} asChild variant="outline" size="sm">
                          <a href={source.href} target="_blank" rel="noopener noreferrer">
                            <SiGithub aria-hidden className="size-4" />
                            {source.label}
                          </a>
                        </Button>
                      ))}
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
          </li>
        );
      })}
    </ul>
  );
}

interface Project {
  title: string;
  description: string;
  src?: StaticImageData;
  alt?: string;
  githubLink: string | null;
  liveLink: string | null;
  sources?: { label: string; href: string }[];
  technologies: { name: string; icon: ReactNode }[];
  content: ReactNode;
}

const projects: Project[] = [
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
    description: "A Website for a Youth Basketball Team",
    src: basketballPreview,
    alt: "Shadow Basketball homepage hero with the club wordmark and basketball game photography",
    githubLink: null,
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
    alt: "Managy homepage with its house illustration and Login, Register, and Learn More buttons",
    githubLink: "https://github.com/davisernst04/managy",
    liveLink: "https://managy-snowy.vercel.app",
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
    title: "Ye Guesser",
    description: "Music Guessing Game",
    src: yeGuesserPreview,
    alt: "Ye Guesser homepage with green lettering, a Play Now button, and a collage of Kanye West album covers",
    githubLink: "https://github.com/davisernst04/ye_guesser",
    liveLink: "https://ye-guesser.vercel.app",
    technologies: [
      { name: "Next.js", icon: <SiNextdotjs size={22} /> },
      { name: "TypeScript", icon: <SiTypescript size={22} /> },
      { name: "React", icon: <SiReact size={22} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
    ],
    content: (
      <p>
        A browser game inspired by Wordle, where players identify Kanye West
        tracks from short audio clips. Each incorrect guess unlocks a longer
        snippet, giving players another chance to name the song.
      </p>
    ),
  },
  {
    title: "Ascendume",
    description: "AI-Powered Résumé Builder · In Development",
    src: ascendumePreview,
    alt: "Ascendume home screen with the headline Get hired yesterday and a résumé preview",
    githubLink: "https://github.com/davisernst04/ascendume",
    liveLink: "https://ascendume.vercel.app",
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
