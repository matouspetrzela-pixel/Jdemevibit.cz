import { generatePageMetadata } from "@/app/seo/generateMetadata";
import { ArchiveLogSection } from "@/components/ArchiveLogSection";
import { getProjects } from "@/lib/projects";
import { LabInnerLayout } from "@/components/lab/LabInnerLayout";

export const metadata = generatePageMetadata({
  title: "Archiv projektů — experimenty & shipy",
  description:
    "Private archive: vybrané buildy, prototypy a produkční moduly. High-signal přehled bez katalogové vaty.",
  path: "/projekty",
});

export default function ProjektyPage() {
  const projects = getProjects();

  return (
    <LabInnerLayout wide>
      <div className="min-h-[60vh] bg-black">
        <ArchiveLogSection projects={projects} />
      </div>
    </LabInnerLayout>
  );
}
