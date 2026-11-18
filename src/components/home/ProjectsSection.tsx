import ProjectList from "@/components/ProjectList";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-4 max-w-6xl mx-auto pb-10 md:pb-12"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <ProjectList />
    </section>
  );
}
