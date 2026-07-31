"use client";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const heroLinks = [
  {
    href: "https://github.com/davisernst04",
    label: "GitHub",
    ariaLabel: "Davis Ernst on GitHub (opens in a new tab)",
    Icon: SiGithub,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/davisernst",
    label: "LinkedIn",
    ariaLabel: "Davis Ernst on LinkedIn (opens in a new tab)",
    Icon: FaLinkedin,
    external: true,
  },
  {
    href: "mailto:davis.ernst@outlook.com",
    label: "Email",
    ariaLabel: "Send an email to Davis Ernst",
    Icon: Mail,
    external: false,
  },
  {
    href: "/DavisErnstResume.pdf",
    label: "Résumé",
    ariaLabel: "Download Davis Ernst's résumé (PDF)",
    Icon: FileDown,
    external: false,
    download: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      id="home"
      className="px-4 max-w-6xl mx-auto pt-4 lg:pt-8 pb-8"
      aria-label="Hero section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <motion.div variants={imageVariants} className="relative group">
            <AspectRatio ratio={1}>
              <Image
                src="/photos/profile.JPG"
                alt="Portrait of Davis Ernst"
                fill
                className="rounded-full object-cover shadow-lg motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
                priority
              />
            </AspectRatio>
          </motion.div>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-9xl font-bold "
          >
            Davis Ernst
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-lg md:text-2xl font-medium text-muted-foreground pb-2"
          >
            Computer Science Student at the University of Saskatchewan |
            Software Developer
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 list-none m-0 p-0"
          >
            {heroLinks.map(({ href, label, ariaLabel, Icon, external, download }) => (
              <motion.li key={label} variants={itemVariants}>
                <a
                  href={href}
                  aria-label={ariaLabel}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  {...(download ? { download: "DavisErnstResume.pdf" } : {})}
                  className="group inline-flex items-center gap-2 rounded-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Icon aria-hidden className="w-4.5 h-4.5" />
                  <span className="underline-offset-4 group-hover:underline">
                    {label}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
}
