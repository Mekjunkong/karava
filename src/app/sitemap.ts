import type { MetadataRoute } from "next";

const siteUrl = "https://santifuneral.com";

const locales = ["th", "en"];
const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/packages", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/packages/basic", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/packages/standard", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/packages/premium", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/packages/custom", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/process", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            th: `${siteUrl}/th${page.path}`,
            en: `${siteUrl}/en${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}
