import { redirect } from "next/navigation";

/** Index návodů přesměrován na The Vault (Phase Alpha). Články zůstávají na /navody/[slug]. */
export default function NavodyIndexPage() {
  redirect("/vault");
}
