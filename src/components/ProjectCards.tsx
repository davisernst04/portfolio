"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
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
  const [active, setActive] = useState<(typeof cards)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null),
  );

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-[140]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[150] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 md:p-10 pt-20 md:pt-24">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-4xl h-auto flex flex-col bg-card rounded-2xl overflow-hidden shadow-2xl border mb-10"
              >
                <Card className="border-none shadow-none py-0">
                  <motion.div
                    layoutId={`image-${active.title}-${id}`}
                    className="relative w-full h-60 md:h-[450px] cursor-pointer overflow-hidden border-b"
                    onClick={() => setActive(null)}
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        fill
                        src={active.src}
                        alt={active.title}
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                    </AspectRatio>
                  </motion.div>

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <motion.div layoutId={`title-${active.title}-${id}`}>
                          <CardTitle className="text-2xl md:text-3xl font-bold">
                            {active.title}
                          </CardTitle>
                        </motion.div>
                        <motion.div
                          layoutId={`description-${active.title}-${id}`}
                        >
                          <CardDescription className="text-base md:text-lg mt-2">
                            {active.description}
                          </CardDescription>
                        </motion.div>
                      </div>

                      <div className="flex gap-3 items-center w-full md:w-auto">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="rounded-full"
                        >
                          <motion.a
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            href={active.githubLink}
                            target="_blank"
                            title="View Code"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        </Button>

                        {active.ctaLink && (
                          <Button asChild className="rounded-full px-6 font-semibold">
                            <motion.a
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              href={active.ctaLink}
                              target="_blank"
                            >
                              Visit Site
                            </motion.a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {active.technologies && (
                      <div className="mt-6 flex gap-2 flex-wrap">
                        {active.technologies.map((tech, idx) => (
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

                    <CardContent className="px-0 mt-8">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-none"
                      >
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                      </motion.div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-6 px-4 pb-16">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer group"
          >
            <Card className="h-full overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300 py-0">
              <CardHeader className="p-0">
                <motion.div
                  layoutId={`image-${card.title}-${id}`}
                  className="w-full relative overflow-hidden"
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      fill
                      src={card.src}
                      alt={card.title}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </AspectRatio>
                </motion.div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <motion.div layoutId={`title-${card.title}-${id}`}>
                      <CardTitle className="text-xl md:text-2xl">
                        {card.title}
                      </CardTitle>
                    </motion.div>
                    <motion.div layoutId={`description-${card.title}-${id}`}>
                      <CardDescription className="text-base mt-2">
                        {card.description}
                      </CardDescription>
                    </motion.div>
                  </div>

                  {card.technologies && (
                    <div className="flex gap-4 flex-wrap items-center">
                      {card.technologies.map((tech, idx) => (
                        <div key={idx} className="text-foreground/70 scale-125" title={tech.name}>
                          {tech.icon}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

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
    description: "A website for a basketball team",
    src: "/photos/shadow_basketball.jpg",
    githubLink: "#",
    ctaLink: null,
    technologies: [
      { name: "Python", icon: <SiPython size={16} /> },
      { name: "Django", icon: <SiDjango size={16} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={16} /> },
    ],
    content: () => (
      <p>
        The official website for Shadow Basketball, featuring team rosters, game
        schedules, and player statistics. Built to provide fans and players with
        up-to-date information and a centralized hub for team news.
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
];
