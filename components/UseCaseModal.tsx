"use client";

import { Project } from "@/lib/projects";
import { useEffect } from "react";
import { GlassPanel } from "@/components/lab/GlassPanel";

interface UseCaseModalProps {
  project: Project | null;
  onClose: () => void;
}

const IS_DEV = process.env.NODE_ENV === "development";

export function UseCaseModal({ project, onClose }: UseCaseModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  const categoryClass =
    project.category === "WEB" ? "vc-tag vc-tag--violet" : "vc-tag vc-tag--amber";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="vc-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm shadow-[0_40px_100px_-24px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="use-case-modal-title"
      >
        <div className="sticky top-0 z-10 flex justify-end border-b border-white/[0.08] bg-black/60 px-4 py-3 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm px-3 py-1 font-mono text-xl leading-none text-zinc-400 transition-colors hover:text-[#00f0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
            aria-label="Zavřít"
          >
            ×
          </button>
        </div>

        <div className="border-b border-white/[0.06] p-4 md:p-6">
          <div className="vc-panel mx-auto max-w-2xl overflow-hidden rounded-sm">
            <div className="relative aspect-[16/9] min-h-[12rem] w-full overflow-hidden border-b border-white/[0.08] bg-black/50">
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
                  <div className="font-mono text-sm text-zinc-600">
                    {"// no_preview"}
                  </div>
                )}
              </div>
              <div className="absolute right-3 top-3">
                <span
                  className={
                    project.status === "Veřejný"
                      ? "vc-tag border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "vc-tag vc-tag--amber"
                  }
                >
                  {project.status === "Veřejný" ? "PRODUKCE" : "PROTOTYP"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="lab-section-title text-lg font-bold text-white">
                {project.title}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-500">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="vc-tag text-[0.65rem]">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 ? (
                  <span className="vc-tag text-[0.65rem] text-zinc-500">
                    +{project.technologies.length - 4}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
            <h2
              id="use-case-modal-title"
              className="lab-section-title text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl"
            >
              {project.title}
            </h2>
            <span className={`shrink-0 ${categoryClass}`}>{project.category}</span>
          </div>

          <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
            {project.fullDescription || project.description}
          </p>

          {project.businessBenefit ? (
            <GlassPanel className="p-5">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
                <span className="text-[#00f0ff]/70" aria-hidden>
                  ◆
                </span>
                Business přínos
              </h3>
              <p className="text-sm text-zinc-400">{project.businessBenefit}</p>
            </GlassPanel>
          ) : null}

          <div>
            <h3 className="lab-section-title mb-3 text-lg font-semibold text-white">
              Technologie
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="vc-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <span aria-hidden>⏱</span>
              <span>{project.timeSpent}</span>
            </div>
            <div>
              {project.status === "Veřejný" ? (
                <span className="text-emerald-400/90">Veřejný</span>
              ) : null}
              {project.status === "PROTOTYP" ? (
                <span className="text-amber-200/80">Prototyp</span>
              ) : null}
            </div>
          </div>

          {(project.urlLocal || project.url) && (
            <div className="flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
              {IS_DEV && project.urlLocal ? (
                <a
                  href={project.urlLocal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ht-cta text-[0.65rem]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Otevřít lokálně
                </a>
              ) : null}
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc-btn-primary px-6 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  Otevřít web →
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
