import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";
import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiPython,
    SiTailwindcss,
    SiPostgresql,
    SiNextdotjs,
    SiGit,
    SiNodedotjs,
  } from "react-icons/si";

const features = [
    {
      Icon: SiTypescript,
      name: "TypeScript",
      description: "A typed superset of JavaScript that compiles to plain JavaScript.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: SiJavascript,
      name: "JavaScript",
      description: "A lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: SiPython,
      name: "Python",
      description: "An interpreted, high-level and general-purpose programming language.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
    },
    {
      Icon: SiReact,
      name: "React",
      description: "A free and open-source front-end JavaScript library for building user interfaces or UI components.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: SiNextdotjs,
      name: "Next.js",
      description: "An open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: SiTailwindcss,
        name: "Tailwind CSS",
        description: "A utility-first CSS framework for rapidly building custom user interfaces.",
        href: "/",
        cta: "Learn more",
        background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
    },
    {
        Icon: SiNodedotjs,
        name: "Node.js",
        description: "An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
        href: "/",
        cta: "Learn more",
        background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
    },
    {
        Icon: SiPostgresql,
        name: "PostgreSQL",
        description: "A free and open-source relational database management system emphasizing extensibility and SQL compliance.",
        href: "/",
        cta: "Learn more",
        background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: SiGit,
        name: "Git",
        description: "A distributed version-control system for tracking changes in source code during software development.",
        href: "/",
        cta: "Learn more",
        background: <Image className="absolute -right-20 -top-20 opacity-60" src="/photos/globe.svg" alt="" width={100} height={100} role="presentation" />,
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-4",
    },
  ];
  

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}