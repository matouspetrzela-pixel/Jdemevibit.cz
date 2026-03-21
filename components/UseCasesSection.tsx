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
      <section id="use-cases" className="pt-4 md:pt-6">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lab-eyebrow text-[#00f0ff]/60">{"// projects.grid"}</p>
            <h2 className="lab-section-title mt-3 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
              Projekty
            </h2>
          </div>
          <p className="font-mono text-sm text-zinc-500 md:text-right">
            Zobrazeno 0 projektů
          </p>
        </div>
        <p className="lab-eyebrow py-12 text-center text-zinc-500/80">
          {"// empty — projekty budou přidány brzy"}
        </p>
      </section>
    );
  }

  return (
    <>
      <section id="use-cases" className="pt-4 md:pt-6">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lab-eyebrow text-[#00f0ff]/60">{"// projects.grid"}</p>
            <h2 className="lab-section-title mt-3 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
              Projekty
            </h2>
          </div>
          <p className="font-mono text-sm text-zinc-500 md:text-right">
            Zobrazeno {projects.length}{" "}
            {projects.length === 1
              ? "projekt"
              : projects.length < 5
                ? "projekty"
                : "projektů"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <UseCaseModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
