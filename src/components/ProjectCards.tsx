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
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 md:p-10">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-5xl h-auto flex flex-col bg-card sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.div
                  layoutId={`image-${active.title}-${id}`}
                  className="relative w-full h-60 md:h-96 sm:rounded-tr-lg sm:rounded-tl-lg cursor-pointer overflow-hidden"
                  onClick={() => setActive(null)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      fill
                      src={active.src}
                      alt={active.title}
                      className="object-cover object-top"
                      sizes=""
                    />
                  </AspectRatio>
                </motion.div>

                <div className="relative">
                  <div className="flex justify-between items-start p-4 md:p-6">
                    <div className="">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-xl md:text-2xl"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.title}-${id}`}
                        className="text-sm md:text-base mt-1"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubLink}
                        target="_blank"
                        className="p-2 rounded-full transition-colors"
                        title="View Code"
                      >
                        <Github size={20} />
                      </motion.a>

                      {active.ctaLink && (
                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.ctaLink}
                          target="_blank"
                          className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          Visit
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {active.technologies && (
                    <div className="px-4 md:px-6 pb-2 flex gap-2 flex-wrap">
                      {active.technologies.map((tech, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 px-2 rounded-md text-xs font-medium flex items-center gap-1"
                          title={tech.name}
                        >
                          {tech.icon}
                          <span className="hidden md:inline">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-4 md:p-6 pt-2">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className=" text-sm md:text-base lg:text-lg flex flex-col items-start gap-4 leading-relaxed"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 p-4 md:p-8">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="group p-4 flex flex-col rounded-xl cursor-pointer bg-card border border-transparent transition-colors"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="w-full relative rounded-lg overflow-hidden"
              >
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    src={card.src}
                    alt={card.title}
                    className="object-cover object-top shadow-sm group-hover:shadow-md transition-shadow"
                    sizes=""
                  />
                </AspectRatio>
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  layout
                  className="font-medium text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.title}-${id}`}
                  layout
                  className="text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
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
    src: "/Game-Boy-Original-2976723000.jpg",
    githubLink: "https://github.com/yourusername/emulator",
    ctaLink: "https://emulator-demo.com",
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
    src: "/RTGA.jpg",
    githubLink: "https://github.com/yourusername/scraper",
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
    src: "/managy.png",
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
    src: "/shadow_basketball.jpg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,
    technologies: [{ name: "Python", icon: <SiPython size={16} /> }],
    content: () => (
      <p>
        This is a web application built for the Avatar clubhouse in Colombia. It
        serves as a management system for clubhouses administrators and staff. I
        worked on this with an incredible group of people that I'm grateful to
        have met.
      </p>
    ),
  },
  {
    title: "Davis Corner",
    description: "Individual Project",
    src: "/davis_corner.png",
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
