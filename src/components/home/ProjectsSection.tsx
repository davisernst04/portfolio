import ProjectList from "@/components/ProjectList";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="flex min-h-0 flex-col"
    >
      <h2
        id="projects-heading"
        className="mb-2 shrink-0 text-sm uppercase tracking-[0.2em]"
      >
        Projects
      </h2>
      <ProjectList />
    </section>
  );
}
