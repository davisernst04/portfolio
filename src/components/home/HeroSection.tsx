"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const images = [
  "/photos/profile.JPG",
  "/photos/card_swipe1.jpg",
  "/photos/card_swipe2.jpg",
  "/photos/card_swipe3.jpg",
  "/photos/card_swipe4.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="home"
      className="px-4 max-w-6xl mx-auto pt-4 lg:pt-8 pb-8"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative group">
            <AspectRatio ratio={1}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={images[currentIndex]}
                    alt="Davis Ernst"
                    fill
                    className="rounded-full object-cover shadow-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </AspectRatio>
            
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-primary/30"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-tight">
            Davis Ernst
          </h1>
          <h2 className="text-lg md:text-2xl font-medium text-muted-foreground pb-2">
            Software Engineering Candidate | Full-Stack Development &amp;
            Systems Programming
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
            
            <div className="flex justify-center lg:justify-start gap-8 mt-10 pt-4 border-t border-border/50">
              <Link href="#about" className="text-base font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4">
                About
              </Link>
              <Link href="#projects" className="text-base font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4">
                Projects
              </Link>
              <Link href="#contact" className="text-base font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
