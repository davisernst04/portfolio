"use client";
import React from "react";
import { motion } from "motion/react";
import ProjectCards from "@/components/ProjectCards";

export default function ProjectsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="projects"
      className="max-w-6xl mx-auto"
      aria-labelledby="projects-heading"
    >
      <hr className="max-w-6xl mx-auto mb-8 border-border" />
      <h2
        id="projects-heading"
        className="text-center text-7xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8"
      >
        Projects
      </h2>
      <div>
        <ProjectCards />
      </div>
    </motion.section>
  );
}
