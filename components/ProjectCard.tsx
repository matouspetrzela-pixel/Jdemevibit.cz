"use client";

import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const IS_DEV = process.env.NODE_ENV === "development";

function getProjectLinkUrl(project: Project): string | undefined {
  if (IS_DEV && project.urlLocal) return project.urlLocal;
  return project.url ?? project.urlLocal;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isProduction = project.status === "Veřejný";
  const statusLabel = isProduction ? "PRODUKCE" : "PROTOTYP";
  const linkUrl = getProjectLinkUrl(project);

  return (
    <article
      onClick={onClick}
      className="group vc-panel relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-sm transition-[box-shadow] duration-300 hover:shadow-[inset_0_0_48px_rgba(0,240,255,0.07)]"
    >
      <div className="relative aspect-[16/9] min-h-[11rem] w-full overflow-hidden border-b border-white/[0.08] bg-black/50">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
          />
        ) : null}
        <div className="relative flex h-full w-full items-center justify-center p-3">
          {project.image ? (
            <img
              src={project.image}
              alt={`Náhled: ${project.title}`}
              className="h-full w-full rounded-sm object-contain shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-sm bg-black/30 font-mono text-sm text-zinc-600">
              {"// no_preview"}
            </div>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <span
            className={
              isProduction
                ? "vc-tag border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "vc-tag vc-tag--amber"
            }
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="lab-section-title text-lg font-bold text-white">
          {project.title}
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-500">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="vc-tag text-[0.65rem]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 ? (
            <span className="vc-tag text-[0.65rem] text-zinc-500">
              +{project.technologies.length - 3}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>{project.timeSpent}</span>
          {project.status === "Veřejný" ? (
            <span className="text-emerald-400/90">Veřejný</span>
          ) : null}
          {project.status === "PROTOTYP" ? (
            <span className="text-amber-200/80">Prototyp</span>
          ) : null}
        </div>

        {linkUrl ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="vc-text-link mt-1 inline-flex items-center gap-2 font-mono text-sm font-medium"
          >
            Otevřít
            <span aria-hidden>→</span>
          </a>
        ) : (
          <span className="vc-text-link mt-1 inline-flex items-center gap-2 font-mono text-sm font-medium">
            Otevřít
            <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </article>
  );
}
