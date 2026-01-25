// Datový model pro programmatic SEO
// Use cases, návody, nástroje

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
  // TODO: Implementovat načítání z CMS nebo markdown souborů
  return [];
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
