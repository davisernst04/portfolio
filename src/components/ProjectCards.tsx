"use client";

import React from "react";
import { Github } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

import {
  SiTypescript,
  SiReact,
  SiPython,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiGooglecloud,
  SiNextdotjs,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function ProjectCards() {
  return (
    <ul className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
      {cards.map((card) => (
        <li key={card.title} className="h-full">
          <Card className="h-full flex flex-col overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300 py-0">
            <CardHeader className="p-0">
              <div className="w-full relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    src={card.src}
                    alt={card.title}
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </AspectRatio>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-grow">
                  <CardTitle className="text-2xl font-bold">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {card.description}
                  </CardDescription>
                </div>

                <div className="flex gap-3 items-center w-full md:w-auto shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={card.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>

                  {card.ctaLink && (
                    <Button asChild className="rounded-full px-6 font-semibold">
                      <a
                        href={card.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Site
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-muted-foreground text-base leading-relaxed">
                {typeof card.content === "function"
                  ? card.content()
                  : card.content}
              </div>

              {card.technologies && (
                <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                  {card.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="flex items-center gap-2 py-1 px-3"
                    >
                      <span className="text-foreground/80">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

const cards = [
  {
    title: "Gameboy Emulator",
    description: "Individual Project | NPM Package",
    src: "/photos/typescript_gameboy_emulator.png",
    githubLink: "https://github.com/davisernst04/typescript_gameboy_emulator",
    ctaLink: "https://emulator-demo.vercel.app",
    technologies: [{ name: "TypeScript", icon: <SiTypescript size={16} /> }],
    content: () => (
      <p>
        A Nintendo Game Boy emulator built using TypeScript. Implements the full
        gameboy instruction set with accurate flag handling, I/O, and cycle
        timing. The PPU renders graphics via tiles through a custom pixel
        pipeline using the HTML5 Canvas.
        <br />
        <br />
        Published as an <strong>npm package</strong> for easy integration into browser applications and Node.js projects.
        The build compiles TypeScript to JavaScript, enabling the emulator to run directly in the browser with no plugins or downloads required.
      </p>
    ),
  },
  {
    title: "Real Time Game Analysis",
    description: "SPEN Club at USASK",
    src: "/photos/RTGA.jpg",
    githubLink: "https://github.com/ElleOwO/realtimegamestatistics",
    ctaLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
    ],
    content: () => (
      <p>
        A real time game analysis dashboard built with the Sports Engineering
        Club at the University of Saskatchewan for the women&apos;s soccer team.
        This is an ongoing project.
        <br />
        <br />
        The system uses fine-tuned object and keypoint detection models to track
        player positions and movements in real time, providing coaches with
        actionable insights during active gameplay.
      </p>
    ),
  },
  {
    title: "Shadow Basketball Official Page",
    description: "A website for a youth basketball team",
    src: "/photos/shadow_basketball.jpg",
    githubLink:
      "https://github.com/davisernst04/basketball-registration-platform",
    ctaLink: "https://basketball-registration-platform.vercel.app/",
    technologies: [
      { name: "Typescript", icon: <SiTypescript size={16} /> },
      { name: "Nextjs", icon: <SiNextdotjs size={16} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={16} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
    ],
    content: () => (
      <p>
        The official website for Shadow Basketball, a local youth basketball
        club in Saskatoon. Handles player registration, tryout management, and
        team communications for coaches and parents.
        <br />
        <br />
        Built with a normalized PostgreSQL schema for reliable data management,
        and deployed on Vercel.
      </p>
    ),
  },
  {
    title: "Managy",
    description: "Group Project at USASK",
    src: "/photos/managy.png",
    githubLink: "https://github.com/davisernst04/managy",
    ctaLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={16} /> },
      { name: "Django", icon: <SiDjango size={16} /> },
      { name: "Next.js", icon: <RiNextjsFill size={16} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={16} /> },
      { name: "Google Cloud", icon: <SiGooglecloud size={16} /> },
    ],
    content: () => (
      <p>
        A full-stack management platform built as a group project at the
        University of Saskatchewan. The application handles user authentication,
        role-based access control, and resource management for organization
        administrators and staff.
        <br />
        <br />
        Features include event creation and scheduling, amenity booking, and a
        member registration system. Built with a Django REST backend, Next.js
        frontend, and PostgreSQL database deployed on Google Cloud.
      </p>
    ),
  },
];
