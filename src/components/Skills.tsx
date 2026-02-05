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
  SiLinux,
  SiDocker,
  SiVim,
} from "react-icons/si";
import { Card } from "./ui/card";

const skills = [
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiGit, name: "Git" },
  { Icon: SiLinux, name: "Linux" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiVim, name: "Vim" },
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 max-w-6xl mx-auto py-16">
      <hr className="mb-8 border-border" />
      <h2 className="text-center text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
        Skills
      </h2>
      <Card className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {skills.map(({ Icon, name }) => (
            <div key={name} className="flex items-center gap-3 w-40">
              <Icon className="w-8 h-8 flex-shrink-0 text-foreground/80 hover:text-primary transition-colors duration-300" />
              <span className="text-base font-medium whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
