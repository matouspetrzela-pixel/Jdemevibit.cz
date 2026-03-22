import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";
import { VaultPhaseAlpha } from "@/components/vault/VaultPhaseAlpha";

export const metadata = generatePageMetadata({
  title: "The Vault — exkluzivní protokoly",
  description:
    "Private Laboratory: souborový archív builder protokolů. Clearance kód, bez loginu.",
  path: "/vault",
});

export default function VaultPage() {
  return (
    <LabInnerLayout wide>
      <div className="-mx-5 min-h-[75vh] bg-black px-0 sm:mx-0 sm:px-0">
        <VaultPhaseAlpha />
      </div>
    </LabInnerLayout>
  );
}
