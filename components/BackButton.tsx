"use client";

import Link from "next/link";

export function BackButton() {
  return (
    <div className="container mx-auto px-4 pt-6 pb-4">
      <Link
        href="/"
        className="text-[#ef2c28] text-xs md:text-sm inline-flex items-center gap-2 transition-all opacity-90 hover:opacity-100 border-b border-[#ef2c28] border-opacity-60 hover:border-opacity-100"
      >
        <span>←</span>
        <span>Domů</span>
      </Link>
    </div>
  );
}
