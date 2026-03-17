import type { MetadataRoute } from "next";
import { getAllArticles, getAllCategories } from "@/lib/articles";

const BASE_URL = "https://rodicovskysvet.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const categories = getAllCategories();

  // Statické stránky
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/o-nas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/zasady-ochrany-osobnich-udaju`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/podminky-uzivani`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Stránky kategorií
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/kategorie/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Stránky článků
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/clanky/${article.slug}?kat=${article.category}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
