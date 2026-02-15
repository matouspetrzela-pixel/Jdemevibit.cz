"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { UseCaseModal } from "./UseCaseModal";
import type { Project } from "@/lib/projects";

interface UseCasesSectionProps {
  projects: Project[];
}

export function UseCasesSection({ projects }: UseCasesSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <section id="use-cases" className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff]">
            PROJEKTY
          </h2>
          <p className="text-[#ffffff] opacity-60 text-sm md:text-base">
            Zobrazeno 0 projektů
          </p>
        </div>
        <p className="text-white/70 text-center">
          Projekty budou přidány brzy...
        </p>
      </section>
    );
  }

  return (
    <>
      <section id="use-cases" className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff]">
            PROJEKTY
          </h2>
          <p className="text-[#ffffff] opacity-60 text-sm md:text-base">
            Zobrazeno {projects.length} {projects.length === 1 ? "projekt" : projects.length < 5 ? "projekty" : "projektů"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Modal pro detail */}
      <UseCaseModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
