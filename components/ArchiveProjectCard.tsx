"use client";

import type { KeyboardEvent } from "react";
import { Project } from "@/lib/projects";
import { getArchiveSummary } from "@/lib/archive-project-summary";

interface ArchiveProjectCardProps {
  project: Project;
  onOpen: () => void;
}

const IS_DEV = process.env.NODE_ENV === "development";

function getProjectLinkUrl(project: Project): string | undefined {
  if (IS_DEV && project.urlLocal) return project.urlLocal;
  return project.url ?? project.urlLocal;
}

export function ArchiveProjectCard({ project, onOpen }: ArchiveProjectCardProps) {
  const isLive = project.status === "Veřejný";
  const summary = getArchiveSummary(project);
  const linkUrl = getProjectLinkUrl(project);
  const techLine = project.technologies.join(" · ");
  /** Jen světlé PNG mockupy (screen blend). SVG mají vlastní jemný styl bez mix-blend. */
  const isLightAsset = project.id === "3" || project.id === "14";
  const isVectorDark =
    (project.image?.toLowerCase().endsWith(".svg") ?? false) && !isLightAsset;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Otevřít detail: ${project.title}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      className="group archive-module relative flex min-h-[380px] cursor-pointer flex-col overflow-hidden rounded-sm border border-white/[0.05] bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px] transition-[box-shadow] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]/50 hover:shadow-[inset_0_0_72px_rgba(0,240,255,0.07)]"
    >
      <div className="relative aspect-[16/9] min-h-[10rem] w-full shrink-0 overflow-hidden border-b border-white/[0.05] bg-black">
        <div
          className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_0_32px_rgba(0,0,0,0.85)]"
          aria-hidden
        />
        {project.image ? (
          <img
            src={project.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
          />
        ) : null}

        <div className="relative z-0 flex h-full w-full items-center justify-center p-4">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              className={`archive-module__img max-h-full max-w-full object-contain transition-[filter,opacity] duration-500 ease-out ${
                isLightAsset
                  ? "archive-module__img--light"
                  : isVectorDark
                    ? "archive-module__img--vector-dark"
                    : "brightness-[0.5] contrast-[1.2] grayscale-[0.2] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100"
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-sm text-zinc-600">
              {"// no_signal"}
            </div>
          )}
        </div>

        <div className="absolute right-3 top-3 z-[2] font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="text-[#00f0ff]" aria-hidden>
                •
              </span>
              LIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <span className="text-orange-400" aria-hidden>
                •
              </span>
              DEV
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-5 pb-14">
        <h3 className="font-sans text-lg font-bold tracking-[-0.03em] text-white md:text-xl">
          {project.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-zinc-500">
          {summary}
        </p>

        {project.strapline ? (
          <p className="text-xs font-medium leading-snug tracking-wide text-zinc-400/90">
            {project.strapline}
          </p>
        ) : null}

        {techLine ? (
          <p className="font-mono text-[0.68rem] leading-snug text-white/[0.3] transition-colors duration-500 ease-out group-hover:text-[#00f0ff]/85">
            {techLine}
          </p>
        ) : null}

        {linkUrl ? (
          <span className="sr-only">Externí odkaz k dispozici v detailu.</span>
        ) : null}

        <span
          className="pointer-events-none absolute bottom-5 right-5 font-mono text-lg text-[#00f0ff]/70 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-[#00f0ff] group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.45)]"
          aria-hidden
        >
          →
        </span>
      </div>
    </article>
  );
}
