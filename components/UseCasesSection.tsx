import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function UseCasesSection() {
  if (projects.length === 0) {
    return (
      <section id="projekty" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Projekty
        </h2>
        <p className="text-white/70 text-center">
          Projekty budou přidány brzy...
        </p>
      </section>
    );
  }

  return (
    <section id="projekty" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Projekty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
