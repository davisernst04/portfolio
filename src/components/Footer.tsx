import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  {
    href: "https://github.com/davisernst04",
    label: "GitHub profile",
    Icon: SiGithub,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/davisernst",
    label: "LinkedIn profile",
    Icon: FaLinkedin,
    external: true,
  },
  {
    href: "mailto:davis.ernst@outlook.com",
    label: "Send email",
    Icon: Mail,
    external: false,
  },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Davis Ernst
        </p>

        <nav aria-label="Social and resume links">
          <ul className="flex items-center gap-1">
            {socialLinks.map(({ href, label, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="/DavisErnstResume.pdf"
                download="DavisErnstResume.pdf"
                aria-label="Download resume (PDF)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <FileDown className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
