"use client";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="px-4 max-w-6xl mx-auto pt-8 lg:pt-16 pb-12"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <AspectRatio ratio={1}>
            <Image
              src="/photos/profile.JPG"
              alt="Davis Ernst"
              fill
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </AspectRatio>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <h1 className="text-6xl md:text-9xl lg:text-[200px] font-bold tracking-tight leading-none">
            Davis Ernst
          </h1>
          <h2 className="text-lg md:text-2xl font-medium text-muted-foreground pb-2">
            Software Engineering Candidate | Full-Stack Development &amp; Systems
            Programming
          </h2>
          <div className="w-full max-w-[360px] mx-auto lg:mx-0">
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer w-full px-0"
                asChild
              >
                <Link href="https://github.com/davisernst04">
                  <Github />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="cursor-pointer w-full px-0"
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
                className="cursor-pointer w-full px-0"
                asChild
              >
                <Link href="mailto:davis.ernst@outlook.com">
                  <Mail />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer w-full px-0"
                asChild
              >
                <a href="/DavisErnstResume.pdf" download="DavisErnstResume.pdf">
                  <FileDown />
                </a>
              </Button>
            </div>
            
            <div className="flex justify-center lg:justify-start gap-6 mt-6 pt-2 text-sm font-medium">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
