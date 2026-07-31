"use client";
import { motion, type Variants } from "motion/react";
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

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-4 max-w-6xl mx-auto pb-12"
      aria-labelledby="about-heading"
    >
      {/* The anchor target stays untransformed so anchor scrolling lands on a
          stable position; the reveal motion lives on this inner wrapper. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <hr className="max-w-6xl mx-auto border-border" />
        <h2
          id="about-heading"
          className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-4"
        >
          About Me
        </h2>

        {/* Bio */}
        <div className="max-w-3xl mx-auto lg:mx-0 space-y-8 mt-10">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
            I am a Computer Science Student at the University of Saskatchewan
            and a Software Developer based in Saskatoon, Canada. I&apos;m
            experienced in building full-stack web applications, system
            architecture, and working with various modern technologies. I focus
            on writing clean, maintainable code to build functional and
            scalable software.
          </p>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-left">
            Outside of coding, I enjoy an active lifestyle that includes
            strength training, soccer and basketball. I also love movies and I
            love my dogs!
          </p>
        </div>

        {/* Skills */}
        <h3 className="text-center lg:text-left text-xl font-semibold mt-16 mb-8">
          Skills
        </h3>
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6 list-none m-0 p-0"
        >
          {skills.map(({ Icon, name }) => (
            <motion.li
              key={name}
              variants={skillVariants}
              className="group flex items-center gap-3"
            >
              <Icon
                aria-hidden
                className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
              />
              <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
