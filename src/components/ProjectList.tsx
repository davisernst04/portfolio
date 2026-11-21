"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import ascendumePreview from "../../public/photos/optimized/ascendume.webp";
import basketballPreview from "../../public/photos/optimized/shadow-basketball-hero.webp";
import emulatorPreview from "../../public/photos/optimized/typescript_gameboy_emulator.webp";
import managyPreview from "../../public/photos/optimized/managy-hero.webp";
import rtgaPreview from "../../public/photos/optimized/rtga.webp";
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

const linkClass =
  "motion-link inline-flex items-center gap-1.5 rounded-sm text-foreground/80 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const reducedMotion = "(prefers-reduced-motion: reduce)";

function revealRow(
  list: HTMLUListElement | null,
  row: HTMLLIElement | null,
  behavior: ScrollBehavior,
) {
  if (!list || !row) return;

  const listBox = list.getBoundingClientRect();
  const rowBox = row.getBoundingClientRect();
  const top = rowBox.top - listBox.top;
  const bottom = rowBox.bottom - listBox.bottom;

  // Align taller rows to the top so the title and start of the preview stay visible.
  const offset = rowBox.height > listBox.height || top < 0 ? top : Math.max(0, bottom);
  if (offset !== 0) list.scrollBy({ top: offset, behavior });
}

export default function ProjectList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openRowRef = useRef<HTMLLIElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (openIndex !== null && window.matchMedia(reducedMotion).matches) {
      revealRow(listRef.current, openRowRef.current, "instant");
    }
  }, [openIndex]);

  const handlePanelTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "grid-template-rows") return;

    // In reduced motion, the previous panel may finish collapsing after the
    // new one has opened, shifting the open row inside the list.
    const reduce = window.matchMedia(reducedMotion).matches;
    if (reduce || event.currentTarget.dataset.open === "true") {
      revealRow(listRef.current, openRowRef.current, reduce ? "instant" : "smooth");
    }
  };

  return (
    <ul
      ref={listRef}
      className="project-list list-none min-h-0 overflow-y-auto overscroll-contain -mx-3 my-0 py-1 px-0"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const panelId = `${id}-panel-${index}`;

        return (
          <li key={project.title} ref={isOpen ? openRowRef : undefined} className="project-row px-3">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="project-trigger flex w-full items-center justify-between gap-4 py-3 text-left group cursor-pointer rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            >
              <h3 className="text-xl text-foreground/85 group-hover:text-foreground transition-colors">
                {project.title}
              </h3>
              <Plus
                aria-hidden
                className="project-toggle w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-label={project.title}
              aria-hidden={!isOpen}
              inert={!isOpen}
              data-open={isOpen}
              onTransitionEnd={handlePanelTransitionEnd}
              className="project-panel"
            >
              <div className="relative min-h-0 overflow-hidden">
                <div className="project-details flex flex-col gap-3 pb-4">
                  {project.preview && (
                    <Image
                      src={project.preview.src}
                      alt={project.preview.alt}
                      sizes="(max-width: 32rem) calc(100vw - 2rem), 30rem"
                      placeholder="blur"
                      className="h-auto w-full rounded-md border border-border bg-muted"
                    />
                  )}

                  <div className="text-muted-foreground leading-relaxed">
                    {project.content}
                  </div>

                  <ul className="project-tech flex flex-wrap gap-3 list-none m-0 p-0">
                    {project.technologies.map((tech) => (
                      <li key={tech.name} className="flex items-center" title={tech.name}>
                        <span aria-hidden className="text-foreground/70">
                          {tech.icon}
                        </span>
                        <span className="sr-only">{tech.name}</span>
                      </li>
                    ))}
                  </ul>

                  {(project.githubLink || project.liveLink) && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View the source code for ${project.title} on GitHub (opens in a new tab)`}
                          className={linkClass}
                        >
                          <SiGithub aria-hidden className="size-4" />
                          <span className="link-label">GitHub</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit the live ${project.title} site (opens in a new tab)`}
                          className={linkClass}
                        >
                          <ArrowUpRight aria-hidden className="size-4" />
                          <span className="link-label">Live site</span>
                        </a>
                      )}
                    </div>
                  )}
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
  preview?: { src: StaticImageData; alt: string };
  githubLink: string | null;
  liveLink: string | null;
  technologies: { name: string; icon: ReactNode }[];
  content: ReactNode;
}

const projects: Project[] = [
  {
    title: "Game Boy Emulator",
    preview: {
      src: emulatorPreview,
      alt: "Game Boy Emulator showing the Pokémon Red title screen and on-screen controls",
    },
    githubLink: "https://github.com/davisernst04/typescript_gameboy_emulator",
    liveLink: "https://emulator-demo.vercel.app",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={18} /> },
      { name: "JavaScript", icon: <SiJavascript size={18} /> },
      { name: "npm", icon: <SiNpm size={18} /> },
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
    preview: {
      src: rtgaPreview,
      alt: "Camera set up on the sideline of a soccer field for real-time game analysis",
    },
    githubLink: "https://github.com/ElleOwO/realtimegamestatistics",
    liveLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={18} /> },
      { name: "React", icon: <SiReact size={18} /> },
      { name: "TypeScript", icon: <SiTypescript size={18} /> },
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
    preview: {
      src: basketballPreview,
      alt: "Shadow Basketball homepage with the club wordmark and game photography",
    },
    githubLink: null,
    liveLink: "https://basketball-registration-platform.vercel.app/",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={18} /> },
      { name: "Next.js", icon: <SiNextdotjs size={18} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
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
    preview: {
      src: managyPreview,
      alt: "Managy homepage with a house illustration and buttons to log in, register, or learn more",
    },
    githubLink: "https://github.com/davisernst04/managy",
    liveLink: "https://managy-snowy.vercel.app",
    technologies: [
      { name: "Python", icon: <SiPython size={18} /> },
      { name: "Django", icon: <SiDjango size={18} /> },
      { name: "Next.js", icon: <SiNextdotjs size={18} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={18} /> },
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
    preview: {
      src: yeGuesserPreview,
      alt: "Ye Guesser homepage with a Play Now button and a collage of Kanye West album covers",
    },
    githubLink: "https://github.com/davisernst04/ye_guesser",
    liveLink: "https://ye-guesser.vercel.app",
    technologies: [
      { name: "Next.js", icon: <SiNextdotjs size={18} /> },
      { name: "TypeScript", icon: <SiTypescript size={18} /> },
      { name: "React", icon: <SiReact size={18} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
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
    preview: { src: ascendumePreview, alt: "Ascendume homepage with a résumé preview" },
    githubLink: "https://github.com/davisernst04/ascendume",
    liveLink: "https://ascendume.vercel.app",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={18} /> },
      { name: "Next.js", icon: <SiNextdotjs size={18} /> },
      { name: "React", icon: <SiReact size={18} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
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
