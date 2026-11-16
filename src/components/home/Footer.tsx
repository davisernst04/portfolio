import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Reveal } from "@/components/Reveal";

const socialLinks = [
  { href: "https://github.com/davisernst04", label: "GitHub profile", Icon: SiGithub, external: true },
  { href: "https://www.linkedin.com/in/davisernst", label: "LinkedIn profile", Icon: FaLinkedin, external: true },
  { href: "mailto:davis.ernst@outlook.com", label: "Send email", Icon: Mail, external: false },
];

export default function Footer() {
  return (
    <Reveal>
      <footer className="px-4 sm:px-6 max-w-6xl mx-auto" role="contentinfo">
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold">Davis Ernst</h3>
          </div>
          <nav aria-label="Social media links">
            <ul className="flex gap-5 items-center list-none m-0 p-0">
              {socialLinks.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="motion-link inline-flex rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <Icon aria-hidden className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Davis Ernst. All rights reserved.</p>
        </div>
      </footer>
    </Reveal>
  );
}
