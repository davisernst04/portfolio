import type { Metadata } from "next";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import ProjectCards from "@/components/ProjectCards";
import {
  generatePersonSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Davis Ernst's portfolio. Computer Science student at the University of Saskatchewan, passionate about software development, sports, and cinema.",
};

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
        <section
          className="px-4 max-w-6xl mx-auto py-4 lg:py-10"
          aria-label="Hero section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
            <div className="lg:col-span-6 text-center lg:text-left">
              <h1 className="text-8xl md:text-9xl font-bold tracking-tight sm:text-8xl lg:text-[200px]">
                Davis Ernst
              </h1>
            </div>

            <div className="lg:col-span-6">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src="/profile_pic.JPEG"
                  alt="Portrait of Davis Ernst"
                  fill
                  className="object-cover rounded-full shadow-2xl border-border border-2 transition-transform hover:scale-105 duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </AspectRatio>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="px-4 max-w-6xl mx-auto pb-4"
          aria-labelledby="about-heading"
        >
          <hr className="max-w-6xl mx-auto my-12 border-border" />
          <h2
            id="about-heading"
            className="text-center text-7xl font-bold tracking-tight sm:text-7xl lg:text-9xl pb-4"
          >
            About Me
          </h2>
          <Card>
            <CardContent className="text-xl pt-6 space-y-4">
              <p>
                I am a student at the University of Saskatchewan studying
                computer science. A career in software development is something
                that I am ambitous about. I enjoy learning about operating
                systems and low level programming as much as I also enjoy
                learning about app development. But beyond the actual code I am
                writing, the thing I enjoy most about this field of study is the
                required process of solving a problem. Any chance to peel back a
                layer of abstraction is something to look forward to. I hope I
                can lead a prosperous career and one that will genuinely help
                people along the way.
              </p>
              <p>
                Outside of my career aspirations, I am a huge sports guy. I grew
                up playing all kinds of sports, from hockey to soccer, to
                basketball. Soccer is my favourite sport and I love playing
                soccer as much as I love just about anything. I also love to
                watch soccer and read about it too, so everything and anything
                soccer related I am 1000% in. Unfortunately, I have not been
                able to play for a while because of a ruptured achilles tendon I
                suffered when playing over the summer. I seriously look forward
                to being able to play again. In the mean time, I try to stay
                active in thegym. Exercise is something very important to me. I
                think the reason I am so into sports is the authenticty it
                generates. There is nothing more real than the art of
                competition and the stories that are crafted. Competition is
                where you will find the most authentic human expression.
              </p>
              <p>
                I also really love watching movies. This was never really the
                case before I ruptured my achilles tendon but following surgery,
                I had a bunch of free time before school started back up again
                in the fall. I needed to be stationarywith my leg elevated for
                22 hours of the day, which was awful but it gave the chance to
                watch all of the movies Ihave wanted to see. And there is still
                so much that I really want to see. Some of my favourite movies
                include WALL-E (2008), Heat (1995), and La la Land (2016).
              </p>
              <p>If you read through all of that, thank you!</p>
            </CardContent>
          </Card>
        </section>

        <section
          id="projects"
          className="px-4 max-w-6xl mx-auto"
          aria-labelledby="projects-heading"
        >
          <hr className="max-w-6xl mx-auto my-12 border-border" />
          <h2
            id="projects-heading"
            className="text-center text-7xl font-bold tracking-tight sm:text-7xl lg:text-9xl pb-4"
          >
            Projects
          </h2>
          <div>
            <ProjectCards />
          </div>
        </section>

        <section
          id="contact"
          className="px-4 max-w-6xl mx-auto"
          aria-labelledby="contact-heading"
        >
          <hr className="max-w-6xl mx-auto my-12 border-border" />
          <h2
            id="contact-heading"
            className="text-center text-7xl font-bold tracking-tight sm:text-7xl lg:text-9xl pb-4"
          >
            Contact
          </h2>

          <Card>
            <CardContent className="text-lg pt-6">
              <p className="text-muted-foreground">
                Contact form coming soon...
              </p>
            </CardContent>
          </Card>
        </section>

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
