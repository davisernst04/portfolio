"use client";
import React from "react";
import { motion } from "motion/react";
import Skills from "@/components/Skills";

export default function SkillsSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Skills />
        </motion.div>
    );
}
