import Image from "next/image";
import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import portrait from "../../../public/photos/optimized/profile.webp";

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

export default function HeroSection() {
  return (
    <section
      id="home"
      className="px-4 max-w-6xl mx-auto pt-4 lg:pt-8 pb-10 md:pb-12"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
        {/* Image First on Mobile, Second on Desktop */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative group">
            <div
              className="hero-portrait relative aspect-square overflow-hidden rounded-full bg-muted bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url("${portrait.blurDataURL}")` }}
            >
              <Image
                src={portrait}
                alt="Portrait of Davis Ernst"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1151px) calc((100vw - 96px) / 2), 528px"
                quality={90}
                placeholder="blur"
                preload
              />
            </div>
          </div>
        </div>

        {/* Text Second on Mobile, First on Desktop */}
        <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-4">
          <h1
            className="hero-name text-6xl md:text-7xl lg:text-[200px] font-bold"
          >
            Davis Ernst
          </h1>
          <h2
            className="hero-subtitle text-lg md:text-2xl font-medium text-muted-foreground pb-2"
          >
            Computer Science Student at the University of Saskatchewan |
            Software Developer
          </h2>
          <ul
            className="hero-links flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 list-none m-0 p-0"
          >
            {heroLinks.map(
              ({ href, label, ariaLabel, Icon, external, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={ariaLabel}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(download ? { download: "DavisErnstResume.pdf" } : {})}
                    className="motion-link group inline-flex items-center gap-2 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <Icon aria-hidden className="w-4.5 h-4.5" />
                    <span className="link-label">
                      {label}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
