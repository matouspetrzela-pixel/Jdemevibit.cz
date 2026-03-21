"use client";

import Link from "next/link";

export function BackButton() {
  return (
    <Link href="/" className="vc-back-link">
      <span aria-hidden>←</span>
      <span>Domů</span>
    </Link>
  );
}
