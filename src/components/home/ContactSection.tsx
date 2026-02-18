"use client";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, FileDown } from "lucide-react";

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="px-4 max-w-6xl mx-auto pb-24"
      aria-labelledby="contact-heading"
    >
      <hr className="max-w-6xl mx-auto border-border" />
      <h2
        id="contact-heading"
        className="text-center text-6xl lg:text-9xl font-bold tracking-tight mt-8 mb-8"
      >
        Contact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a question, want to discuss a project, or just
              want to say hi, feel free to reach out!
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
  );
}
