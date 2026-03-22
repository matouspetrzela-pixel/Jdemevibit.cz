"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkBase =
  "font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-200 hover:text-[#00f0ff]";

export function Header() {
  const pathname = usePathname();

  /** Na úvodní stránce stejný odkaz = scroll nahoru (Next na / → / nescrolluje). */
  const handleLabClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const instant = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  };

  const active = (path: string) =>
    pathname === path ? "text-[#00f0ff]" : "";

  const vaultActive =
    pathname?.startsWith("/vault") ||
    pathname?.startsWith("/navody") ||
    pathname?.startsWith("/nastroje")
      ? "text-[#00f0ff]"
      : "";

  return (
    <header className="vc-header sticky top-0 z-[60] border-b border-transparent">
      <div className="mx-auto flex max-w-7xl justify-center px-5 py-3.5 md:justify-end">
        <nav aria-label="Hlavní navigace">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:justify-end md:gap-x-6 md:gap-y-0 lg:gap-x-8">
            <li>
              <Link
                href="/"
                className={`${linkBase} ${active("/")}`}
                onClick={handleLabClick}
                aria-label={
                  pathname === "/"
                    ? "Laboratoř — zpět na začátek stránky"
                    : "Laboratoř — úvodní stránka"
                }
              >
                LABORATOŘ
              </Link>
            </li>
            <li>
              <Link
                href="/projekty"
                className={`${linkBase} ${active("/projekty")}`}
              >
                USE CASES
              </Link>
            </li>
            <li>
              <Link href="/vault" className={`${linkBase} ${vaultActive}`}>
                [THE VAULT]
              </Link>
            </li>
            <li>
              <Link href="/o-mne" className={`${linkBase} ${active("/o-mne")}`}>
                O MNĚ
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className={`${linkBase} ${active("/kontakt")}`}
              >
                KONTAKT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
