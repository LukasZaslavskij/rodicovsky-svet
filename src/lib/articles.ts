import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Složka s obsahem je /content/ v kořeni projektu
const contentDirectory = path.join(process.cwd(), "content");

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;        // název podsložky, např. "programovani"
  categoryLabel: string;   // hezký label, např. "Programování"
  tags: string[];
  excerpt: string;
  coverImage?: string;     // volitelný obrázek (cesta v /public/)
  content: string;         // HTML obsah
}

export interface ArticleMeta extends Omit<Article, "content"> {}

// ─────────────────────────────────────────────────────────
// Načte všechna metadata článků (bez HTML obsahu)
// ─────────────────────────────────────────────────────────
export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];

  if (!fs.existsSync(contentDirectory)) return articles;

  const categories = fs.readdirSync(contentDirectory).filter((name) => {
    const full = path.join(contentDirectory, name);
    return fs.statSync(full).isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(categoryPath, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);

      articles.push({
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category,
        categoryLabel: data.categoryLabel ?? formatCategoryLabel(category),
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage ?? undefined,
      });
    }
  }

  // Řadit od nejnovějšího
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ─────────────────────────────────────────────────────────
// Načte jeden článek včetně HTML obsahu
// ─────────────────────────────────────────────────────────
export async function getArticleBySlug(
  slug: string,
  category: string
): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category,
    categoryLabel: data.categoryLabel ?? formatCategoryLabel(category),
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage ?? undefined,
    content: htmlContent,
  };
}

// ─────────────────────────────────────────────────────────
// Vrátí seznam všech kategorií
// ─────────────────────────────────────────────────────────
export function getAllCategories(): { slug: string; label: string; count: number }[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((name) => fs.statSync(path.join(contentDirectory, name)).isDirectory())
    .map((name) => {
      const files = fs
        .readdirSync(path.join(contentDirectory, name))
        .filter((f) => f.endsWith(".md"));
      return { slug: name, label: formatCategoryLabel(name), count: files.length };
    });
}

// ─────────────────────────────────────────────────────────
// Pomocná funkce: "programovani" → "Programovani"
// (přepsat v frontmatteru: categoryLabel: "Programování")
// ─────────────────────────────────────────────────────────
function formatCategoryLabel(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}
