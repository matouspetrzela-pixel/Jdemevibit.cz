import { Project } from "@/lib/projects";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
            project.category === "WEB"
              ? "bg-[#7b3beb]/20 text-[#7b3beb]"
              : "bg-[#ef2c28]/20 text-[#ef2c28]"
          }`}
        >
          {project.category}
        </span>
        {project.status === "PROTOTYP" && (
          <span className="ml-2 inline-block px-3 py-1 rounded text-xs font-semibold bg-[#ef2c28]/20 text-[#ef2c28]">
            PROTOTYP
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-white/70 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <span>Čas: {project.timeSpent}</span>
        {project.status === "Veřejný" && (
          <span className="text-green-400">Veřejný</span>
        )}
      </div>

      {project.url && (
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#ef2c28] hover:text-[#ff3d35] transition-colors font-medium"
        >
          Otevřít
          <span>→</span>
        </Link>
      )}
    </article>
  );
}
