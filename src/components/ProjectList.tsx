"use client";

import { motion, type Variants } from "motion/react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  SiGithub,
  SiTypescript,
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

const linkClasses =
  "group inline-flex items-center gap-1.5 rounded-sm text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function ProjectList() {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="list-none m-0 p-0 border-y border-border divide-y divide-border"
    >
      {projects.map((project) => (
        <motion.li key={project.title} variants={projectVariants}>
          <article className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="md:col-span-5 relative overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9}>
                <Image
                  fill
                  src={project.src}
                  alt={project.alt}
                  className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </AspectRatio>
            </div>

            <div className="md:col-span-7 flex flex-col gap-4">
              <header>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground mt-1">
                  {project.description}
                </p>
              </header>

              <div className="text-muted-foreground text-base leading-relaxed space-y-4">
                {project.content}
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none m-0 p-0 text-sm text-muted-foreground">
                {project.technologies.map((tech) => (
                  <li key={tech.name} className="flex items-center gap-1.5">
                    <span aria-hidden className="text-foreground/70">
                      {tech.icon}
                    </span>
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-6 mt-1">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View the source code for ${project.title} on GitHub (opens in a new tab)`}
                  className={linkClasses}
                >
                  <SiGithub aria-hidden className="w-4 h-4" />
                  <span className="underline-offset-4 group-hover:underline">
                    Code
                  </span>
                </a>

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit the live ${project.title} site (opens in a new tab)`}
                    className={linkClasses}
                  >
                    <ArrowUpRight aria-hidden className="w-4 h-4" />
                    <span className="underline-offset-4 group-hover:underline">
                      Live
                    </span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </motion.li>
      ))}
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
    technologies: [{ name: "TypeScript", icon: <SiTypescript size={16} /> }],
    content: (
      <>
        <p>
          A Nintendo Game Boy emulator built using TypeScript. Implements the
          full Game Boy instruction set with accurate flag handling, I/O, and
          cycle timing. The PPU renders graphics via tiles through a custom
          pixel pipeline using the HTML5 Canvas.
        </p>
        <p>
          Published as an npm package for easy integration into browser
          applications and Node.js projects. The build compiles TypeScript to
          JavaScript, enabling the emulator to run directly in the browser with
          no plugins or downloads required.
        </p>
      </>
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
      { name: "Python", icon: <SiPython size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
    ],
    content: (
      <>
        <p>
          A real time game analysis dashboard built with the Sports Engineering
          Club at the University of Saskatchewan for the women&apos;s soccer
          team. This is an ongoing project.
        </p>
        <p>
          The system uses fine-tuned object and keypoint detection models to
          track player positions and movements in real time, providing coaches
          with actionable insights during active gameplay.
        </p>
      </>
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
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Next.js", icon: <SiNextdotjs size={16} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
    ],
    content: (
      <>
        <p>
          The official website for Shadow Basketball, a local youth basketball
          club in Saskatoon. Handles player registration, tryout management, and
          team communications for coaches and parents.
        </p>
        <p>
          Built with a normalized PostgreSQL schema for reliable data
          management, and deployed on Vercel.
        </p>
      </>
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
      { name: "Python", icon: <SiPython size={16} /> },
      { name: "Django", icon: <SiDjango size={16} /> },
      { name: "Next.js", icon: <SiNextdotjs size={16} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={16} /> },
    ],
    content: (
      <>
        <p>
          A full-stack management platform built as a group project at the
          University of Saskatchewan. The application handles user
          authentication, role-based access control, and resource management for
          organization administrators and staff.
        </p>
        <p>
          Features include event creation and scheduling, amenity booking, and a
          member registration system. Built with a Django REST backend, Next.js
          frontend, and PostgreSQL database deployed on Google Cloud.
        </p>
      </>
    ),
  },
];
