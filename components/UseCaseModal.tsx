"use client";

import { Project } from "@/lib/projects";
import { useEffect } from "react";

interface UseCaseModalProps {
  project: Project | null;
  onClose: () => void;
}

const IS_DEV = process.env.NODE_ENV === "development";

export function UseCaseModal({ project, onClose }: UseCaseModalProps) {
  // ESC klávesa pro zavření
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.addEventListener("keydown", handleEscape);
      // Zablokovat scroll na body když je modal otevřený
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1217] border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header s X tlačítkem */}
        <div className="sticky top-0 bg-[#0f1217] border-b border-white/10 p-4 flex justify-end z-10">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-2xl font-light"
            aria-label="Zavřít"
          >
            ×
          </button>
        </div>

        {/* Karta projektu (stejný princip náhledu jako v mřížce) */}
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-sm max-w-2xl mx-auto">
            <div className="relative w-full aspect-[16/9] min-h-[12rem] overflow-hidden bg-gradient-to-b from-[#0f1217] to-[#1a1f26] border-b border-white/5">
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-35"
                />
              )}
              <div className="relative w-full h-full p-3 flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Náhled: ${project.title}`}
                    className="w-full h-full object-contain rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-sm rounded-xl bg-white/5">
                    Náhled
                  </div>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide uppercase ${
                    project.status === "Veřejný"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-[#ef2c28]/15 text-[#ef2c28]"
                  }`}
                >
                  {project.status === "Veřejný" ? "PRODUKCE" : "PROTOTYP"}
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/60">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailní informace */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Název a badge */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {project.title}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                project.category === "WEB"
                  ? "bg-[#7b3beb]/20 text-[#7b3beb]"
                  : "bg-[#ef2c28]/20 text-[#ef2c28]"
              }`}
            >
              {project.category}
            </span>
          </div>

          {/* Popis */}
          <div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Business přínos */}
          {project.businessBenefit && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-[#ef2c28]">▲</span>
                Business přínos
              </h3>
              <p className="text-white/80 text-sm">{project.businessBenefit}</p>
            </div>
          )}

          {/* Technologie */}
          <div>
            <h3 className="text-white font-semibold mb-3">Technologie</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/10 rounded text-sm text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Čas a Status */}
          <div className="flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span>⏱</span>
              <span>{project.timeSpent}</span>
            </div>
            <div>
              {project.status === "Veřejný" && (
                <span className="text-green-400">Veřejný</span>
              )}
              {project.status === "PROTOTYP" && (
                <span className="text-[#ef2c28]">Prototyp</span>
              )}
            </div>
          </div>

          {/* Odkazy: v DEV ukazujeme i lokální URL, v produkci jen web */}
          {(project.urlLocal || project.url) && (
            <div className="pt-4 flex flex-wrap gap-3">
              {IS_DEV && project.urlLocal && (
                  <a
                    href={project.urlLocal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#7b3beb] text-white rounded-lg hover:bg-[#8b4bfb] transition-colors font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Otevřít lokálně
                    <span>→</span>
                  </a>
                )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Otevřít web
                  <span>→</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
