"use client";

import { useState } from "react";
import { ArchiveProjectCard } from "@/components/ArchiveProjectCard";
import { UseCaseModal } from "@/components/UseCaseModal";
import type { Project } from "@/lib/projects";

interface ArchiveLogSectionProps {
  projects: Project[];
}

export function ArchiveLogSection({ projects }: ArchiveLogSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const n = projects.length;

  if (n === 0) {
    return (
      <section id="archive-log" className="bg-black pt-4 md:pt-6">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/[0.06] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#00f0ff]/60">
              {"// ARCHIVE .LOG"}
            </p>
            <h1 className="mt-4 font-sans text-3xl font-bold uppercase tracking-[-0.04em] text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              EXPERIMENTY &amp; SHIPI
            </h1>
          </div>
          <p className="font-mono text-xs tracking-wider text-zinc-500 md:text-right">
            [ COUNT: 0_UNITS ]
          </p>
        </header>
        <p className="py-16 text-center font-mono text-sm text-zinc-600">
          {"// archive_empty — žádné moduly"}
        </p>
      </section>
    );
  }

  return (
    <>
      <section id="archive-log" className="bg-black pt-4 md:pt-6">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/[0.06] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#00f0ff]/60">
              {"// ARCHIVE .LOG"}
            </p>
            <h1 className="mt-4 font-sans text-3xl font-bold uppercase tracking-[-0.04em] text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              EXPERIMENTY &amp; SHIPI
            </h1>
          </div>
          <p className="font-mono text-xs tracking-wider text-zinc-500 md:text-right">
            [ COUNT: {n}_UNITS ]
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ArchiveProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
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
