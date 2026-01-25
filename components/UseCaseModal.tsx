"use client";

import { Project } from "@/lib/projects";
import Image from "next/image";
import { useEffect } from "react";

interface UseCaseModalProps {
  project: Project | null;
  onClose: () => void;
}

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

        {/* Zvětšený screenshot */}
        <div className="relative w-full h-48 md:h-64 lg:h-80 bg-white/5">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30">
              Náhled projektu
            </div>
          )}
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
                <span className="text-[#ef2c28]">PROTOTYP</span>
              )}
            </div>
          </div>

          {/* Tlačítko Otevřít web */}
          {project.url && (
            <div className="pt-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
