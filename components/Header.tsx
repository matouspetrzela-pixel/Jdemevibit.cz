"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b border-primary-gray/20">
      <div className="container mx-auto px-4 py-4">
        {/* Navigační lišta */}
        <nav className="flex justify-center md:justify-end" aria-label="Hlavní navigace">
          <ul className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm justify-center md:justify-end">
            <li>
              <Link href="/" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:underline transition-all">
                Domů
              </Link>
            </li>
            <li>
              <Link href="/use-cases" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:underline transition-all">
                Use Cases
              </Link>
            </li>
            <li>
              <Link href="/navody" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:underline transition-all">
                Návody
              </Link>
            </li>
            <li>
              <Link href="/o-mne" className="text-[#FFFFFF] opacity-90 hover:opacity-100 transition-opacity border-b border-[#ef2c28] border-opacity-100">
                O mně
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:underline transition-all">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
