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
            className="px-4 max-w-6xl mx-auto"
            aria-labelledby="projects-heading"
        >
            <hr className="max-w-6xl mx-auto my-12 border-border" />
            <h2
                id="projects-heading"
                className="text-center text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight pb-8"
            >
                Projects
            </h2>
            <div>
                <ProjectCards />
            </div>
        </motion.section>
    );
}
