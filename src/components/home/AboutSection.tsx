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

const skills = [
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiGit, name: "Git" },
  { Icon: SiLinux, name: "Linux" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiVim, name: "Vim" },
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
                <CardTitle className="text-4xl font-bold tracking-tight mb-4 text-center lg:text-left">
                  What I'm all about
                </CardTitle>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
                  I am a Computer Science Student at the University of
                  Saskatchewan and a Software Developer based in Saskatoon,
                  Canada. I'm experienced in building full-stack web
                  applications, system architecture, and working with various
                  modern technologies. I focus on writing clean, maintainable
                  code to build functional and scalable software.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
                  Outside of coding, I enjoy an active lifestyle that includes
                  strength training, soccer and basketball. I also love movies
                  and I love my dogs!
                </p>

              </div>
            </div>

            <hr className="border-border/50" />

            {/* Skills */}
            <div>
              <CardTitle className="text-4xl font-bold tracking-tight mb-8 text-center lg:text-left">
                What I know
              </CardTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map(({ Icon, name }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
