// Datový model pro programmatic SEO
// Use cases, návody, nástroje

import { getProjects, type Project } from "./projects";

export type ContentCategory = "use-case" | "navod" | "nastroj";

export interface BaseContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface UseCase extends BaseContent {
  category: "use-case";
  // Kontext
  context: string;
  goal: string;
  // Proces
  tools: string[];
  timeSpent: string;
  process: string[];
  prompts?: string[];
  iterations?: string[];
  // Výsledek
  result: string;
  url?: string;
  githubUrl?: string;
  // Lessons learned
  lessonsLearned?: string[];
  // SEO
  keywords: string[];
  ogImage?: string;
}

export interface Navod extends BaseContent {
  category: "navod";
  // Struktura návodu
  steps: Array<{
    title: string;
    description: string;
    code?: string;
    image?: string;
  }>;
  tools: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  timeRequired: string;
  // SEO
  keywords: string[];
}

export interface Nastroj extends BaseContent {
  category: "nastroj";
  // Popis nástroje
  what: string;
  why: string;
  how: string;
  // Praktické použití
  useCases: string[];
  alternatives?: string[];
  // SEO
  keywords: string[];
}

export type Content = UseCase | Navod | Nastroj;

// Helper pro získání všech content items
export function getAllContent(): Content[] {
  // Načtení use-cases z projektů (pouze na serveru)
  const projects = getProjects();
  const useCases: UseCase[] = projects.map((project) => {
    // Vytvoření slug z ID nebo title
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");
    
    return {
      id: project.id,
      slug,
      title: project.title,
      description: project.description,
      category: "use-case",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: project.status === "Veřejný",
      // Mapování z Project na UseCase
      context: project.fullDescription || project.description,
      goal: project.businessBenefit || "Vytvořit funkční řešení pomocí AI nástrojů.",
      tools: project.technologies,
      timeSpent: project.timeSpent,
      process: project.fullDescription 
        ? [project.fullDescription] 
        : ["Projekt byl vytvořen pomocí AI nástrojů."],
      result: project.fullDescription || project.description,
      url: project.url,
      keywords: project.technologies,
      ogImage: project.image,
    };
  });

  return useCases;
}

// Helper pro získání content podle slug
export function getContentBySlug(slug: string): Content | null {
  const allContent = getAllContent();
  return allContent.find((item) => item.slug === slug) || null;
}

// Helper pro získání content podle kategorie
export function getContentByCategory(category: ContentCategory): Content[] {
  const allContent = getAllContent();
  return allContent.filter((item) => item.category === category && item.published);
}
