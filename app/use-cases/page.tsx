import { redirect } from "next/navigation";

/** Seznam projektů přesunut na /projekty (Archive .LOG). */
export default function UseCasesIndexPage() {
  redirect("/projekty");
}
