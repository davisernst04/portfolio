"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Github, Globe, X } from "lucide-react";
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
          // WRAPPER: Fixed full screen, flex center for desktop, full coverage for mobile
          <div className="fixed inset-0 grid place-items-center z-[100] sm:px-4 sm:py-8">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              // CARD:
              // Mobile: Full width/height, no radius
              // Desktop: Max widths, rounded corners, fit height
              className="w-full h-full sm:h-fit sm:max-h-[90vh] sm:max-w-2xl flex flex-col bg-card sm:rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* CLOSE BUTTON (Mobile & Desktop) */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </motion.button>

              {/* IMAGE SECTION */}
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative"
              >
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-64 sm:h-80 object-cover object-top sm:rounded-tr-lg sm:rounded-tl-lg"
                />
              </motion.div>

              {/* SCROLLABLE CONTENT AREA */}
              <div className="flex flex-col flex-1 overflow-y-auto bg-card">
                <div className="flex flex-col gap-4 p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-2xl sm:text-3xl"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-muted-foreground text-base mt-1"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {/* 1. Github Button */}
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubLink}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-full font-bold border border-border bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <Github size={18} />
                        <span className="hidden sm:inline">GitHub</span>
                      </motion.a>

                      {/* 2. Visit Button */}
                      {active.ctaLink && (
                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.ctaLink}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-full font-bold bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Globe size={18} />
                          Visit
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* --- TECH STACK ICONS --- */}
                  {active.technologies && active.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center my-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
                        Tech Stack:
                      </span>
                      {active.technologies.map((tech, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-md bg-secondary/30 border border-border/50"
                          title={tech.name}
                        >
                          {tech.icon}
                        </div>
                      ))}
                    </div>
                  )}

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-base leading-relaxed text-foreground/90 pb-10 sm:pb-0"
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
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="group p-4 flex flex-col bg-card rounded-xl cursor-pointer border border-border/50 shadow-sm hover:shadow-lg transition-all active:scale-95"
          >
            <div className="flex gap-4 flex-col w-full h-full">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="w-full h-48 overflow-hidden rounded-lg"
              >
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <div className="flex flex-col flex-1 justify-start">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-semibold text-lg"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-muted-foreground text-sm mt-1"
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

// --- DATA STRUCTURE (Unchanged) ---
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
        icon: <SiTypescript className="text-blue-600" size={18} />,
      },
      { name: "React", icon: <SiReact className="text-cyan-400" size={18} /> },
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

    technologies: [{ name: "Python", icon: <SiPython size={18} /> }],

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
      { name: "Python", icon: <SiPython size={18} /> },
      {
        name: "Django",
        icon: <SiDjango size={18} />,
      },
      {
        name: "Next.js",
        icon: <RiNextjsFill size={18} />,
      },
      {
        name: "Postgresql",
        icon: <SiPostgresql size={18} />,
      },
      {
        name: "Tailwindcss",
        icon: <SiTailwindcss size={18} />,
      },
      {
        name: "Typescript",
        icon: <SiTypescript size={18} />,
      },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud size={18} />,
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
    description: "Individual Project",
    src: "BasketballTraining.jpg",
    githubLink: "https://github.com/yourusername/scraper",
    ctaLink: null,

    technologies: [{ name: "Python", icon: <SiPython size={18} /> }],

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
        icon: <RiNextjsFill size={18} />,
      },
      {
        name: "Typescript",
        icon: <SiTypescript size={18} />,
      },
      {
        name: "Tailwindcss",
        icon: <SiTailwindcss size={18} />,
      },
      {
        name: "Postgresql",
        icon: <SiPostgresql size={18} />,
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
