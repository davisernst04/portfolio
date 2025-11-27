"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Github, Globe, Code2, Cpu, FileJson } from "lucide-react"; // Example icons
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
export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
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

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 md:top-4 md:right-4 items-center justify-center rounded-full h-8 w-8 shadow-lg z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card  md:rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                {/* Image Height Logic: h-60 on mobile, h-80 on larger */}
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 md:h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4 p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-lg md:text-2xl"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className=" text-sm md:text-base mt-1"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2">
                      {/* 1. Github Button (Always visible) */}
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubLink}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-full font-bold transition-colors"
                      >
                        <Github size={16} />
                      </motion.a>

                      {/* 2. Visit Button (Conditional) */}
                      {active.ctaLink && (
                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.ctaLink}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          <Globe size={16} />
                          Visit Live
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* --- TECH STACK ICONS --- */}
                  {active.technologies && active.technologies.length > 0 && (
                    <div className="flex gap-2 items-center">
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Technology Used:
                      </span>
                      {active.technologies.map((tech, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-md"
                          title={tech.name} // Tooltip on hover
                        >
                          {tech.icon}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* --- ACTION BUTTONS --- */}
                </div>

                <div className="pt-0 relative px-4 md:px-6 pb-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm md:text-base flex flex-col gap-4"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* --- GRID CONTAINER --- */}
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex bg-card flex-col  rounded-xl cursor-pointer border shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full rounded-lg object-cover object-top h-48 sm:h-60 md:h-48"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium   text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
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

// --- DATA STRUCTURE ---

const cards = [
  {
    title: "Gameboy Emulator",
    description: "Individual Project",
    src: "/Game-Boy-Original-2976723000.jpg",
    githubLink: "https://github.com/yourusername/emulator",
    ctaLink: "https://emulator-demo.com",

    technologies: [
      {
        name: "TypeScript",
        icon: <SiTypescript className="text-blue-600" size={16} />,
      },
      { name: "React", icon: <SiReact className="text-cyan-400" size={16} /> },
    ],

    content: () => {
      return (
        <p>
          A Nintendo Game Boy emulator written in Typescript. Although
          Typescript is not a language known for writing emulators, its ability
          to integrate well with the web makes it a unique choice for this kind
          of project. <br />
          <br />
          The canvas tag is used to write the Gameboy's pixels onto the screen.
          This was a really fun project to work on and I learned a lot from
          building it.
        </p>
      );
    },
  },
  {
    title: "Real Time Game Analysis",
    description: "SPEN Club at USASK",
    src: "RTGA.jpg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,

    technologies: [{ name: "Python", icon: <SiPython size={16} /> }],

    content: () => {
      return (
        <p>
          This is an ongoing project with the sports engineering club at the
          University of Saskatchewan. We are working towards creating a real
          time game analysis program for the women's soccer team. Although we
          are just getting started, I have had a lot of fun working with a
          fantastic group of people.
        </p>
      );
    },
  },
  {
    title: "Managy",
    description: "Group Project at USASK",
    src: "HotelBooking.jpeg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,

    technologies: [
      { name: "Python", icon: <SiPython size={16} /> },
      {
        name: "Django",
        icon: <SiDjango size={16} />,
      },
      {
        name: "Next.js",
        icon: <RiNextjsFill size={16} />,
      },
      {
        name: "Postgresql",
        icon: <SiPostgresql size={16} />,
      },
      {
        name: "Tailwindcss",
        icon: <SiTailwindcss size={16} />,
      },
      {
        name: "Typescript",
        icon: <SiTypescript size={16} />,
      },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud size={16} />,
      },
    ],

    content: () => {
      return (
        <p>
          This is a web application built for the Avatar clubhouse in Colombia.
          It serves as a management system for clubhouses administrators and
          staff. It also serves people who want to join the clubhouse as it
          offers user authentication and access to resources such as ammenities
          and events created by the clubhouse staff. <br />
          <br />I could not have asked for a better group to work on this with.
          Every one of them were absolutely awesome to work with. We all worked
          really hard on this and I believe that was reflected in the grade that
          we got for this project, which was a 100%!
        </p>
      );
    },
  },
  {
    title: "Basketball Coaching Platform",
    description: "Individual Project for Basketball Club",
    src: "BasketballTraining.jpg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,

    technologies: [{ name: "Python", icon: <SiPython size={16} /> }],

    content: () => {
      return (
        <p>
          This is a web application built for the Avatar clubhouse in Colombia.
          It serves as a management system for clubhouses administrators and
          staff. It also serves people who want to join the clubhouse as it
          offers user authentication and access to resources such as ammenities
          and events created by the clubhouse staff. <br />
          <br />I could not have asked for a better group to work on this with.
          Every one of them were absolutely awesome to work with. We all worked
          really hard on this and I believe that was reflected in the grade that
          we got for this project, which was a 100%!
        </p>
      );
    },
  },
  {
    title: "D's Corner",
    description: "Individual Project",
    src: "HEAT.jpg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,

    technologies: [
      {
        name: "Next.js",
        icon: <RiNextjsFill size={16} />,
      },
      {
        name: "Typescript",
        icon: <SiTypescript size={16} />,
      },
      {
        name: "Tailwindcss",
        icon: <SiTailwindcss size={16} />,
      },
      {
        name: "Postgresql",
        icon: <SiPostgresql size={16} />,
      },
    ],

    content: () => {
      return (
        <p>
          Haven't really decided what this is supposed to be. I guess you could
          call it a personal blog, a diary maybe. I call it a place where I can
          dump my thoughts and ideas about the things that interest me and even
          the things that don't. I'd encourage anyone to create something
          similar. Even though you may be speaking into a void, it can be
          therapeautic to do the occasional brain dump. Maybe other people will
          find them interesting too. Who knows? <br />
          <br />I talk a lot about sports, movies, and life in general. If you
          also like to talk about these things, maybe you'll find something you
          like here.
        </p>
      );
    },
  },
];
