"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ContactTerminalModal } from "@/components/ContactTerminalModal";

const linkBase =
  "font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-200 hover:text-[#00f0ff]";

function scrollToTopIfSamePage(
  e: MouseEvent<HTMLAnchorElement>,
  sameRoute: boolean
) {
  if (!sameRoute) return;
  e.preventDefault();
  const instant = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
}

export function Header() {
  const pathname = usePathname();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const closeContactModal = useCallback(() => setContactModalOpen(false), []);

  const onLab = (e: MouseEvent<HTMLAnchorElement>) =>
    scrollToTopIfSamePage(e, pathname === "/");

  const onProjekty = (e: MouseEvent<HTMLAnchorElement>) =>
    scrollToTopIfSamePage(e, pathname === "/projekty");

  const onVault = (e: MouseEvent<HTMLAnchorElement>) =>
    scrollToTopIfSamePage(e, pathname === "/vault");

  const onOMne = (e: MouseEvent<HTMLAnchorElement>) =>
    scrollToTopIfSamePage(e, pathname === "/o-mne");

  const onKontakt = (e: MouseEvent<HTMLAnchorElement>) =>
    scrollToTopIfSamePage(e, pathname === "/kontakt");

  function handleKontaktClick(e: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/kontakt") {
      onKontakt(e);
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault();
    setContactModalOpen(true);
  }

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
      <ContactTerminalModal
        open={contactModalOpen}
        onClose={closeContactModal}
      />
      <div className="mx-auto flex max-w-7xl justify-center px-5 py-3.5 md:justify-end">
        <nav aria-label="Hlavní navigace">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:justify-end md:gap-x-6 md:gap-y-0 lg:gap-x-8">
            <li>
              <Link
                href="/"
                className={`${linkBase} ${active("/")}`}
                onClick={onLab}
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
                onClick={onProjekty}
                aria-label={
                  pathname === "/projekty"
                    ? "Use Cases — zpět na začátek stránky"
                    : "Use Cases — archiv projektů"
                }
              >
                USE CASES
              </Link>
            </li>
            <li>
              <Link
                href="/vault"
                className={`${linkBase} ${vaultActive}`}
                onClick={onVault}
                aria-label={
                  pathname === "/vault"
                    ? "The Vault — zpět na začátek stránky"
                    : "The Vault — protokoly"
                }
              >
                [THE VAULT]
              </Link>
            </li>
            <li>
              <Link
                href="/o-mne"
                className={`${linkBase} ${active("/o-mne")}`}
                onClick={onOMne}
                aria-label={
                  pathname === "/o-mne"
                    ? "O mně — zpět na začátek stránky"
                    : "O mně"
                }
              >
                O MNĚ
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className={`group relative inline-flex min-h-[1.35em] min-w-0 items-center justify-end sm:min-w-[14.5rem] ${linkBase} ${active("/kontakt")}`}
                onClick={handleKontaktClick}
                aria-label={
                  pathname === "/kontakt"
                    ? "Kontakt — zpět na začátek stránky"
                    : "Kontakt — otevřít zabezpečený kanál (nebo Ctrl+klik na stránku Kontakt)"
                }
              >
                <span className="transition-opacity duration-200 group-hover:opacity-0">
                  [ KONTAKT ]
                </span>
                <span
                  className="pointer-events-none absolute right-0 top-1/2 max-w-[min(72vw,19rem)] -translate-y-1/2 text-right text-[0.62rem] leading-tight opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-[0.65rem] md:text-xs"
                  aria-hidden
                >
                  [ ESTABLISH_CONNECTION ]
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
