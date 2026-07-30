"use client";
import React from "react";
import { motion } from "motion/react";
import ProjectCards from "@/components/ProjectCards";

export default function ProjectsSection() {
  return (
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="projects"
      className="px-4 max-w-6xl mx-auto pb-12"
      aria-labelledby="projects-heading"
    >
      <hr className="max-w-6xl mx-auto border-border" />
      <h2
        id="projects-heading"
        className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-4"
      >
        Projects
      </h2>
      <div>
        <ProjectCards />
      </div>
    </motion.section>
  );
}
