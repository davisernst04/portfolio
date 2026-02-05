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
} from "react-icons/si";

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
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 max-w-6xl mx-auto py-16">
      <hr className="mb-8 border-border" />
      <h2 className="text-center text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
        Skills
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
        {skills.map(({ Icon, name }) => (
          <div key={name} className="group flex items-center gap-2">
            <Icon className="w-8 h-8 text-foreground/80 group-hover:text-primary transition-colors duration-300" />
            <span className="text-lg font-medium">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
