"use client";
import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-4 max-w-6xl mx-auto pb-10 md:pb-12"
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
          className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-10 md:mt-12 mb-4"
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
      </motion.div>
    </section>
  );
}
