"use client";
import React from "react";
import { motion } from "motion/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import { ImageSwiper } from "@/components/ui/image-swiper";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="home"
      className="px-4 max-w-6xl mx-auto pt-8 lg:pt-16 pb-12"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <AspectRatio ratio={1}>
            <ImageSwiper
              images="/photos/profile.JPG, /photos/card_swipe2.jpg, /photos/card_swipe4.jpg, /photos/card_swipe1.jpg"
              className="rounded-full"
            />
          </AspectRatio>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <h1 className="text-6xl md:text-9xl lg:text-[200px] font-bold tracking-tight leading-none">
            Davis Ernst
          </h1>
          <h2 className="text-lg md:text-2xl font-medium text-muted-foreground pb-2">
            Computer Science Student at The University of Saskatchewan |
            Software Developer
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
                disabled
              >
                <FileDown />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
