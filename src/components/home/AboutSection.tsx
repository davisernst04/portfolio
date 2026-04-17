"use client";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiNextdotjs,
  SiGit,
  SiNodedotjs,
  SiLinux,
  SiDocker,
  SiVim,
} from "react-icons/si";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { Icon: SiTypescript, name: "TypeScript" },
      { Icon: SiJavascript, name: "JavaScript" },
      { Icon: SiReact, name: "React" },
      { Icon: SiNextdotjs, name: "Next.js" },
      { Icon: SiTailwindcss, name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { Icon: SiNodedotjs, name: "Node.js" },
      { Icon: SiPython, name: "Python" },
      { Icon: SiPostgresql, name: "PostgreSQL" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { Icon: SiGit, name: "Git" },
      { Icon: SiLinux, name: "Linux" },
      { Icon: SiDocker, name: "Docker" },
      { Icon: SiVim, name: "Vim" },
    ],
  },
];

export default function AboutSection() {
  return (
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="about"
      className="px-4 max-w-6xl mx-auto pb-12"
    >
      <hr className="max-w-6xl mx-auto border-border" />
      <h2 className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-4">
        About Me
      </h2>

      <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors duration-500">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col gap-8 md:gap-12">
            {/* Bio Section */}
            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
                  Fourth-year CS student at the University of Saskatchewan,
                  graduating in 2027. I build full-stack web apps and systems
                  with a focus on clean architecture — currently into React,
                  TypeScript, and Python. When I&apos;m not coding, I&apos;m probably
                  on a soccer pitch, in the gym, or watching movies with my two
                  dogs.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
                  I&apos;m particularly proud of a Gameboy Emulator I built from
                  scratch — it&apos;s on npm and runs entirely in the browser with
                  no plugins. Right now I&apos;m exploring ML-driven sports
                  analytics and looking for summer 2026 internships.
                </p>
              </div>
            </div>

            <hr className="border-border/50" />

            {/* Skills */}
            <div className="space-y-6">
              {skillGroups.map(({ category, skills }) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(({ Icon, name }) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border/40 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
