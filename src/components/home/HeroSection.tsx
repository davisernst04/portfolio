"use client";
import React from "react";
import { motion } from "motion/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="home"
      className="px-4 max-w-6xl mx-auto pt-8 lg:pt-16 pb-24 scroll-mt-16"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <AspectRatio ratio={1}>
            <Image
              src="/photos/profile.JPG"
              alt="Davis Ernst"
              className="rounded-full object-cover border-2 shadow-lg"
              fill
              priority
            />
          </AspectRatio>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <h1 className="text-6xl md:text-9xl lg:text-[200px] font-bold tracking-tight">
            Davis Ernst
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
            Computer Science Student at the University of Saskatchewan and
            Software Developer based in Saskatoon, SK.
          </p>
          <div className="flex justify-center lg:justify-start gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              asChild
            >
              <Link href="https://github.com/davisernst04">
                <Github />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="cursor-pointer"
              size="lg"
              asChild
            >
              <Link href="https://www.linkedin.com/in/davis-ernst-987391362/">
                <Linkedin />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              asChild
            >
              <Link href="mailto:davis.ernst@outlook.com">
                <Mail />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              disabled
            >
              <FileDown />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
