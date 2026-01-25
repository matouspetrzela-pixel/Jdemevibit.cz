// Data projektů pro use cases sekci

export interface Project {
  id: string;
  title: string;
  category: "WEB" | "PROTOTYPE";
  description: string;
  technologies: string[];
  timeSpent: string;
  status: "Veřejný" | "PROTOTYP";
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  // Přidejte projekty podle potřeby
  // {
  //   id: "1",
  //   title: "Název projektu",
  //   category: "WEB",
  //   description: "Popis projektu...",
  //   technologies: ["Next.js", "TypeScript"],
  //   timeSpent: "3h",
  //   status: "Veřejný",
  //   url: "https://example.com",
  // },
];
