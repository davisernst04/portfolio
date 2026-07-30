import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Davis Ernst — Computer Science student at the University of Saskatchewan and software developer based in Saskatoon, Canada.",
};

const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Linux",
  "Docker",
  "Vim",
];

const contactLinks = [
  {
    href: "https://github.com/davisernst04",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/davisernst",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "mailto:davis.ernst@outlook.com",
    label: "davis.ernst@outlook.com",
    external: false,
  },
  {
    href: "/DavisErnstResume.pdf",
    label: "Résumé (PDF)",
    external: false,
    download: "DavisErnstResume.pdf",
  },
];

export default function About() {
  return (
    <div className="py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About</h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
        <p>
          I&apos;m a Computer Science student at the University of Saskatchewan
          and a software developer based in Saskatoon, Canada. I&apos;m
          experienced in building full-stack web applications, system
          architecture, and working with various modern technologies. I focus
          on writing clean, maintainable code to build functional and scalable
          software.
        </p>
        <p>
          Outside of coding, I enjoy an active lifestyle that includes strength
          training, soccer and basketball. I also love movies and I love my
          dogs!
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Currently</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        I&apos;m focused on finishing my Computer Science degree (April 2027)
        and building full-stack and backend software. I&apos;m currently open
        to new opportunities and collaborations — feel free to reach out.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Skills</h2>
      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
        {skills.map((skill, index) => (
          <li key={skill} className="flex items-center gap-2">
            <span>{skill}</span>
            {index < skills.length - 1 && (
              <span aria-hidden="true" className="text-border">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-semibold">Contact</h2>
      <ul className="mt-3 space-y-2">
        {contactLinks.map(({ href, label, external, download }) => (
          <li key={href}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(download ? { download } : {})}
              className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
