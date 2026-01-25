"use client";

import { Project } from "@/lib/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors cursor-pointer h-full flex flex-col"
    >
      {/* Grafický náhled nahoře */}
      <div className="relative w-full h-48 bg-white/5">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
            Náhled
          </div>
        )}
        {/* Badge s typem vpravo nahoře */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
              project.category === "WEB"
                ? "bg-[#7b3beb]/20 text-[#7b3beb]"
                : "bg-[#ef2c28]/20 text-[#ef2c28]"
            }`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Obsah karty */}
      <div className="p-4 flex flex-col flex-1">
        {/* Název projektu */}
        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>

        {/* Popis - zkrácený */}
        <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Technologie - tagy */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Čas a Status */}
        <div className="flex items-center justify-between text-xs text-white/60 mb-4">
          <span>{project.timeSpent}</span>
          {project.status === "Veřejný" && (
            <span className="text-green-400">Veřejný</span>
          )}
          {project.status === "PROTOTYP" && (
            <span className="text-[#ef2c28]">PROTOTYP</span>
          )}
        </div>

        {/* Tlačítko Otevřít */}
        <button className="text-[#ef2c28] hover:text-[#ff3d35] transition-colors font-medium text-sm text-left inline-flex items-center gap-2">
          Otevřít
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
