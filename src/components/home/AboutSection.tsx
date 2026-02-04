"use client";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="about"
      className="px-4 max-w-6xl mx-auto pb-4"
      aria-labelledby="about-heading"
    >
      <hr className="max-w-6xl mx-auto my-12 border-border" />
      <h2
        id="about-heading"
        className="text-center text-7xl lg:text-9xl font-bold tracking-tight pb-12"
      >
        About Me
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Card className="h-full order-1">
          <CardContent className="text-lg md:text-xl pt-6 space-y-4 leading-relaxed text-foreground h-full flex flex-col justify-center">
            <p>
              I am an ambitous Computer Science student at the University of
              Saskatchewan. Most of my work is in full stack development, but I
              also enjoy working on mobile applications and machine learning
              projects.
            </p>
            <p>
              Beyond the code I write, I am a sports and fitness enthusiast. I
              love going to the gym and playing soccer. I also love movies
            </p>
            <p>
              If you wish to learn more about me personally, you can check out
              my blog by clicking the button below!
            </p>
            <Button variant="ghost" className="w-full p-0 mt-2" asChild>
              <Link
                href="https://davisernst.com/corner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User className="inline mr-2" />
                Visit My Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
