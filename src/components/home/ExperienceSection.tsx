"use client";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  type: "education" | "position" | "leadership";
}

const experiences: Experience[] = [
  {
    title: "University of Saskatchewan",
    role: "Bachelor of Science in Computer Science",
    period: "2022 - 2026",
    description: "Pursuing a degree in Computer Science with a focus on full-stack development and systems programming.",
    highlights: [
      "GPA: 3.8+",
      "Coursework: Data Structures, Algorithms, Databases, Systems Programming",
      "Active in tech community and university clubs"
    ],
    type: "education"
  },
  {
    title: "Sports Engineering Club (SPEN)",
    role: "UI/UX Lead & Software Developer",
    period: "2024 - Present",
    description: "Leading frontend development and UX design for real-time game analysis platform used by USask women's soccer team.",
    highlights: [
      "Translate coaching requirements into technical specifications",
      "Design and implement live tactical visualization interfaces",
      "Collaborate with ML engineers on computer vision integration",
      "Deployed to production for live match analysis"
    ],
    type: "leadership"
  },
  {
    title: "Software Development",
    role: "Full-Stack Developer (Self-Directed)",
    period: "2023 - Present",
    description: "Building production applications with modern web technologies, focusing on user experience and system performance.",
    highlights: [
      "Shipped 3+ production applications",
      "Experience with Next.js, TypeScript, React, PostgreSQL, Supabase",
      "Implementing CI/CD pipelines and automated deployments",
      "Focus on clean architecture and maintainable code"
    ],
    type: "position"
  }
];

const TypeBadge = ({ type }: { type: Experience["type"] }) => {
  const variants = {
    education: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    position: "bg-green-500/20 text-green-700 dark:text-green-400",
    leadership: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  };
  
  const labels = {
    education: "Education",
    position: "Professional",
    leadership: "Leadership",
  };

  return (
    <Badge className={`${variants[type]} border-0`}>
      {labels[type]}
    </Badge>
  );
};

export default function ExperienceSection() {
  return (
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="experience"
      className="px-4 max-w-6xl mx-auto pb-12"
    >
      <hr className="max-w-6xl mx-auto border-border" />
      <h2 className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-8">
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="border-border/60 shadow-sm bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl md:text-3xl font-bold">{exp.title}</h3>
                      <TypeBadge type={exp.type} />
                    </div>
                    <p className="text-lg font-semibold text-primary">{exp.role}</p>
                    <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                  </div>
                </div>

                <p className="text-base md:text-lg text-foreground/80 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
