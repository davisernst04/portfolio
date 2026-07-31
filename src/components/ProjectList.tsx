"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "./ui/button";
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

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProjectList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="list-none m-0 p-0 mt-10 border-y border-border divide-y divide-border"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index;
        const panelId = `${id}-panel-${index}`;

        return (
          <motion.li key={project.title} variants={projectVariants}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <Plus
                aria-hidden
                className={`w-6 h-6 shrink-0 text-muted-foreground group-hover:text-foreground transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-4 relative overflow-hidden rounded-md">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          fill
                          src={project.src}
                          alt={project.alt}
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 384px"
                        />
                      </AspectRatio>
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-5">
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
                        <Button asChild variant="outline" size="sm">
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
                          <Button asChild size="sm">
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

const projects = [
  {
    title: "Game Boy Emulator",
    description: "Individual Project",
    src: "/photos/typescript_gameboy_emulator.png",
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
    src: "/photos/RTGA.jpg",
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
    src: "/photos/shadow_basketball.jpg",
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
    src: "/photos/managy.png",
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
];
