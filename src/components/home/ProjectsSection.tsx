"use client";
import { motion } from "motion/react";
import ProjectList from "@/components/ProjectList";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-4 max-w-6xl mx-auto pb-12"
      aria-labelledby="projects-heading"
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
          id="projects-heading"
          className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-4"
        >
          Projects
        </h2>
        <ProjectList />
      </motion.div>
    </section>
  );
}
