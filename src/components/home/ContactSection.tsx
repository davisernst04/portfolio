"use client";
import { motion, type Variants } from "motion/react";
import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const contactLinks = [
  {
    href: "mailto:davis.ernst@outlook.com",
    label: "Email",
    detail: "davis.ernst@outlook.com",
    ariaLabel: "Send an email to Davis Ernst",
    Icon: Mail,
    external: false,
  },
  {
    href: "https://github.com/davisernst04",
    label: "GitHub",
    detail: "@davisernst04",
    ariaLabel: "Davis Ernst on GitHub (opens in a new tab)",
    Icon: SiGithub,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/davisernst",
    label: "LinkedIn",
    detail: "in/davisernst",
    ariaLabel: "Davis Ernst on LinkedIn (opens in a new tab)",
    Icon: FaLinkedin,
    external: true,
  },
  {
    href: "/DavisErnstResume.pdf",
    label: "Résumé",
    detail: "PDF download",
    ariaLabel: "Download Davis Ernst's résumé (PDF)",
    Icon: FileDown,
    external: false,
    download: true,
  },
];

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-4 max-w-6xl mx-auto pb-12"
      aria-labelledby="contact-heading"
    >
      {/* The anchor target stays untransformed so anchor scrolling lands on a
          stable position; the reveal motion lives on this inner wrapper. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <hr className="max-w-6xl mx-auto border-border" />
        <h2
          id="contact-heading"
          className="text-center lg:text-left text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mt-4 mb-4"
        >
          Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a question, want to discuss a project, or just
              want to say hi, feel free to reach out!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Socials &amp; Résumé</h3>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4 list-none m-0 p-0"
            >
              {contactLinks.map(
                ({ href, label, detail, ariaLabel, Icon, external, download }) => (
                  <motion.li key={label} variants={itemVariants}>
                    <a
                      href={href}
                      aria-label={ariaLabel}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      {...(download ? { download: "DavisErnstResume.pdf" } : {})}
                      className="group inline-flex items-baseline gap-3 rounded-sm text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      <Icon
                        aria-hidden
                        className="w-4.5 h-4.5 shrink-0 translate-y-[3px] text-muted-foreground group-hover:text-foreground transition-colors"
                      />
                      <span className="font-medium underline-offset-4 group-hover:underline">
                        {label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {detail}
                      </span>
                    </a>
                  </motion.li>
                )
              )}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
