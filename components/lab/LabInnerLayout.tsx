import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";

export function LabInnerLayout({
  children,
  wide = false,
  showBack = true,
}: {
  children: ReactNode;
  wide?: boolean;
  showBack?: boolean;
}) {
  const mainClass = wide ? "lab-main-inner lab-main-inner--wide" : "lab-main-inner lab-main-inner--narrow";

  return (
    <div className="lab-page min-h-screen">
      <Header />
      <main className={mainClass}>
        {showBack ? <BackButton /> : null}
        {children}
      </main>
    </div>
  );
}
