// Data projektů pro use cases sekci
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  category: "WEB" | "PROTOTYPE";
  description: string;
  fullDescription?: string; // Celý popis pro modal detail
  technologies: string[];
  timeSpent: string;
  status: "Veřejný" | "PROTOTYP";
  url?: string;
  image?: string; // Cesta k screenshotu
  businessBenefit?: string; // Business přínos projektu
}

interface MarkdownFrontmatter {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  timeSpent: string;
  status: string;
  category: "WEB" | "PROTOTYPE";
  createdAt?: string;
  image?: string;
  url?: string;
  businessBenefit?: string;
}

// Načtení projektů z markdown souborů
function loadProjectsFromMarkdown(): Project[] {
  try {
    // Primárně: projects/ v rootu projektu (Vercel i lokální build z jdemevibit-web/)
    const inRepo = path.join(process.cwd(), "projects");
    if (fs.existsSync(inRepo)) {
      return loadProjectsFromPath(inRepo);
    }
    // Fallback: workspace má projects/ vedle jdemevibit-web (lokální vývoj)
    const parentDir = path.join(process.cwd(), "..", "projects");
    if (fs.existsSync(parentDir)) {
      return loadProjectsFromPath(parentDir);
    }
    console.warn(`Projects directory not found. Tried: ${inRepo}, ${parentDir}`);
    return [];
  } catch (error) {
    console.error("Error loading projects from markdown:", error);
    return [];
  }
}

function loadProjectsFromPath(projectsDir: string): Project[] {
  try {
    
    // Načtení všech .md souborů
    const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".md"));
    
    const projects: Project[] = files
      .map((file) => {
        try {
          const filePath = path.join(projectsDir, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          const frontmatter = data as MarkdownFrontmatter;

          // Mapování status z markdown na Project interface
          const status: "Veřejný" | "PROTOTYP" =
            frontmatter.status === "Veřejný"
              ? "Veřejný"
              : "PROTOTYP";

          // Mapování category
          const category: "WEB" | "PROTOTYPE" =
            frontmatter.category === "WEB" ? "WEB" : "PROTOTYPE";

          const project: Project = {
            id: frontmatter.id,
            title: frontmatter.title,
            category,
            description: frontmatter.description,
            fullDescription: content.trim() || frontmatter.description,
            technologies: frontmatter.technologies || [],
            timeSpent: frontmatter.timeSpent || "Není uvedeno",
            status,
            url: frontmatter.url,
            image: frontmatter.image,
            businessBenefit: frontmatter.businessBenefit,
          };

          return project;
        } catch (error) {
          console.error(`Error parsing project file ${file}:`, error);
          return null;
        }
      })
      .filter((project): project is Project => project !== null)
      .sort((a, b) => {
        // Seřazení podle ID (číslo v názvu souboru)
        const aId = parseInt(a.id) || 0;
        const bId = parseInt(b.id) || 0;
        return aId - bId;
      });

    return projects;
  } catch (error) {
    console.error("Error loading projects from markdown:", error);
    return [];
  }
}

// Server-side funkce pro načtení projektů
// Tato funkce může být volána pouze na serveru
export function getProjects(): Project[] {
  return loadProjectsFromMarkdown();
}

// Export pro případné použití (ale mělo by se používat getProjects() na serveru)
export const projects: Project[] = typeof window === "undefined" 
  ? loadProjectsFromMarkdown() 
  : [];
