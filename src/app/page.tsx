"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, User, FileDown } from "lucide-react";
import ProjectCards from "@/components/ProjectCards";
import Skills from "@/components/Skills";
import {
  generatePersonSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="flex-grow">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="about"
          className="px-4 max-w-6xl mx-auto py-8 lg:py-10"
          aria-label="Hero section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
            {/* Image First on Mobile, Second on Desktop */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <AspectRatio ratio={1}>
                <Image
                  src="/profile.JPG"
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
            className="text-center text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight pb-12"
          >
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card className="h-full order-1">
              <CardContent className="text-lg md:text-xl pt-6 space-y-4 leading-relaxed text-foreground h-full flex flex-col justify-center">
                <p>
                  I am an ambitous Computer Science student at the University of
                  Saskatchewan. Most of my work is in full stack development,
                  but I also enjoy working on mobile applications and machine
                  learning projects.
                </p>
                <p>
                  Beyond the code I write, I am a sports and fitness enthusiast.
                  I love going to the gym and playing soccer. I also love movies
                </p>
                <p>
                  If you wish to learn more about me personally, you can check
                  out my blog by clicking the button below!
                </p>
                <Button variant="ghost" className="w-full p-0 mt-2" asChild>
                  <Link
                    href="https://davisernst04.medium.com/"
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Skills />
        </motion.div>

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

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="contact"
          className="px-4 max-w-6xl mx-auto"
          aria-labelledby="contact-heading"
        >
          <hr className="max-w-6xl mx-auto my-12 border-border" />
          <h2
            id="contact-heading"
            className="text-center text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight pb-8"
          >
            Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Let&apos;s Connect
                </h3>
                <p className="text-muted-foreground mb-6">
                  I&apos;m currently open to new opportunities and
                  collaborations. Whether you have a question, want to discuss a
                  project, or just want to say hi, feel free to reach out!
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:davis.ernst@outlook.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Socials & Resume</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://github.com/davisernst04"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://linkedin.com/in/davis-ernst-987391362"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    disabled
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Resume (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <footer className="px-4 sm:px-6 max-w-6xl mx-auto" role="contentinfo">
          <hr className="max-w-6xl mx-auto my-12 border-border" />

          <div className="flex flex-col sm:flex-row justify-between items-center py-8 gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold">Davis Ernst</h3>
            </div>

            <nav aria-label="Social media links">
              <ul className="flex gap-5 items-center list-none m-0 p-0">
                <li>
                  <a
                    href="https://github.com/davisernst04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/davis-ernst-987391362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:davis.ernst@outlook.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Send email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center py-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Davis Ernst. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
