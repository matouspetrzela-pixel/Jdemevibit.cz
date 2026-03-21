"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkBase =
  "font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-200 hover:text-[#00f0ff]";

export function Header() {
  const pathname = usePathname();

  const active = (path: string) =>
    pathname === path ? "text-[#00f0ff]" : "";

  const navodyActive =
    pathname?.startsWith("/navody") || pathname?.startsWith("/nastroje")
      ? "text-[#00f0ff]"
      : "";

  return (
    <header className="sticky top-0 z-[60] border-b border-[#00f0ff]/15 bg-[#02040a]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-3.5 md:flex-row md:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[0.65rem] font-bold tracking-[0.36em] text-white md:text-[0.68rem]"
        >
          <span
            className="ht-pulse-dot"
            style={{ width: 5, height: 5 }}
            aria-hidden
          />
          JDEME VIBIT
        </Link>
        <nav aria-label="Hlavní navigace">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-x-8">
            <li>
              <Link href="/" className={`${linkBase} ${active("/")}`}>
                Laboratoř
              </Link>
            </li>
            <li>
              <Link
                href="/use-cases"
                className={`${linkBase} ${active("/use-cases")}`}
              >
                Use Cases
              </Link>
            </li>
            <li>
              <Link href="/navody" className={`${linkBase} ${navodyActive}`}>
                Návody
              </Link>
            </li>
            <li>
              <Link href="/o-mne" className={`${linkBase} ${active("/o-mne")}`}>
                O mně
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className={`${linkBase} ${active("/kontakt")}`}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
