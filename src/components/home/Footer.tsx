import { FileDown, Mail, Terminal } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

const linkClass =
  "motion-link inline-flex items-center gap-1.5 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const links = [
  { href: "https://github.com/davisernst04", label: "GitHub", Icon: SiGithub, external: true },
  { href: "https://www.linkedin.com/in/davisernst", label: "LinkedIn", Icon: FaLinkedin, external: true },
  { href: "https://github.com/davisernst04/dotfiles", label: "Dotfiles", Icon: Terminal, external: true },
  { href: "mailto:davis.ernst@outlook.com", label: "Email", Icon: Mail },
  { href: "/DavisErnstResume.pdf", label: "Résumé", Icon: FileDown, download: true },
];

export default function Footer() {
  return (
    <footer className="mt-[clamp(0.5rem,2dvh,1.25rem)] shrink-0 border-t border-border pt-2 text-sm">
      <nav aria-label="Profile links">
        <ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0 sm:gap-x-6">
          {links.map(({ href, label, Icon, external, download }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(download ? { download: "DavisErnstResume.pdf" } : {})}
                className={linkClass}
              >
                <Icon aria-hidden className="size-4" />
                <span className="link-label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
