"use client";

import React from "react";
import { motion } from "motion/react";
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
    <ul className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-8 px-4 pb-16">
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
    description: "Individual Project",
    src: "/photos/Game-Boy-Original-2976723000.jpg",
    githubLink: "https://github.com/davisernst04/gameboy-emulator",
    ctaLink: null,
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
    ],
    content: () => (
      <p>
        A Nintendo Game Boy emulator written in Typescript. Although Typescript
        is not a language known for writing emulators, its ability to integrate
        well with the web makes it a unique choice for this kind of project.{" "}
        <br /> <br />
        The canvas tag is used to write the Gameboy pixels onto the screen. This
        was a really fun project to work on and I learned a lot from building
        it.
      </p>
    ),
  },
  {
    title: "Real Time Game Analysis",
    description: "SPEN Club at USASK",
    src: "/photos/RTGA.jpg",
    githubLink: "https://github.com/ElleOwO/realtimegamestatistics",
    ctaLink: null,
    technologies: [{ name: "Python", icon: <SiPython size={16} /> }],
    content: () => (
      <p>
        This is an ongoing project with the sports engineering club at the
        University of Saskatchewan. We are working towards creating a real time
        game analysis program for the women soccer team. Although we are just
        getting started, I have had a lot of fun working with a fantastic group
        of people.
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
        This is a web application built for the Avatar clubhouse in Colombia. It
        serves as a management system for clubhouses administrators and staff.
        It also serves people who want to join the clubhouse as it offers user
        authentication and access to resources such as ammenities and events
        created by the clubhouse staff.
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
        The official website for Shadow Basketball. This is primarily a place
        where parents can go to register their kids for basketball tryouts and
        find information about the team. It also serves as a place where the
        coaches can post updates and information about the team. This was a fun
        project to work on as it allowed me to use my web development skills to
        help out a local youth sports team.
      </p>
    ),
  },
  {
    title: "Davis Corner",
    description: "Individual Project",
    src: "/photos/davis_corner.png",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: "https://davisernst.com/corner",
    technologies: [
      { name: "Next.js", icon: <RiNextjsFill size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={16} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
    ],
    content: () => (
      <p>
        Have not really decided what this is supposed to be. I guess you could
        call it a personal blog, a diary maybe. I call it a place where I can
        dump my thoughts and ideas about the things that interest me.
      </p>
    ),
  },

  {
    title: "Ye Guesser",
    description: "Individual Project",
    src: "/photos/ye_guesser.png",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: "https://ye-guesser.vercel.app",
    technologies: [
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Next.js", icon: <RiNextjsFill size={16} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={16} /> },
    ],
    content: () => (
      <p>
        Preface: this is not an endorsment Ye's inflammatory behaviour. This is
        just something I wanted to make to test my knowledge of Kanye West's
        music. He is my most streamed music artist and thought this would be fun
        to make.
        <br />
        <br />
        This was created using Deezer's API where you can get information about
        an artist's discography and their top tracks. I used this information to
        create a wordle-like game where you have to guess the name of the song
        based on a short audio clip. The more guesses you have, the more of the
        song you can listen to. You only have 6 guesses so you better make them
        count!
      </p>
    ),
  },
];
