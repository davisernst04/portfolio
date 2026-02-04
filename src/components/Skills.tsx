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
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 max-w-6xl mx-auto py-10">
      <hr className="mb-12 border-border" />
      <h2 className="text-center text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight pb-12">
        Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map(({ Icon, name }) => (
          <div
            key={name}
            className="group flex flex-col items-center justify-center gap-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300"
          >
            <Icon className="w-12 h-12 text-foreground/80 group-hover:text-primary transition-colors duration-300" />
            <span className="text-sm font-medium text-center">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
