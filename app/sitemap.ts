import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rensonametall.se";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/skrota`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/metall`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/foretag`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/om-oss`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/integritetspolicy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/villkor`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
