"use client";

import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const IS_DEV = process.env.NODE_ENV === "development";

/** V DEV prostředí preferuje urlLocal, jinak url. */
function getProjectLinkUrl(project: Project): string | undefined {
  if (IS_DEV && project.urlLocal) return project.urlLocal;
  return project.url ?? project.urlLocal;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isProduction = project.status === "Veřejný";
  const statusLabel = isProduction ? "PRODUKCE" : "PROTOTYP";
  const statusClasses = isProduction
    ? "bg-emerald-500/20 text-emerald-300"
    : "bg-[#ef2c28]/15 text-[#ef2c28]";
  const linkUrl = getProjectLinkUrl(project);

  return (
    <article
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer h-full flex flex-col relative group shadow-sm min-h-[420px]"
    >
      {/* Jemný červený highlight při hoveru */}
      <div className="absolute inset-0 rounded-2xl border border-[#ef2c28]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Hero náhled projektu – pokud obrázek nesedí, zbytek vyplní jemné pozadí z obrázku */}
      <div className="relative w-full aspect-[16/9] min-h-[11rem] overflow-hidden bg-gradient-to-b from-[#0f1217] to-[#1a1f26] border-b border-white/5">
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
        {/* Status badge vpravo nahoře */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide uppercase ${statusClasses}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Obsah karty */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Název projektu */}
        <h3 className="text-lg font-bold text-white">{project.title}</h3>

        {/* Popis - zkrácený */}
        <p className="text-white/70 text-sm line-clamp-3 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Technologie - tagy */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/80"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/60">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Čas a Status */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{project.timeSpent}</span>
          {project.status === "Veřejný" && (
            <span className="text-green-400">Veřejný</span>
          )}
          {project.status === "PROTOTYP" && (
            <span className="text-[#ef2c28]">Prototyp</span>
          )}
        </div>

        {/* Odkaz / tlačítko Otevřít – dynamický href na localhost (urlLocal) i produkci (url) */}
        {linkUrl ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 text-[#ef2c28] hover:text-[#ff3d35] transition-colors font-medium text-sm text-left inline-flex items-center gap-2"
          >
            Otevřít
            <span>→</span>
          </a>
        ) : (
          <button className="mt-2 text-[#ef2c28] hover:text-[#ff3d35] transition-colors font-medium text-sm text-left inline-flex items-center gap-2">
            Otevřít
            <span>→</span>
          </button>
        )}
      </div>
    </article>
  );
}
