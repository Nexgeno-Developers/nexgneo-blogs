import { db } from "@/lib/db";

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: "yearly" | "monthly" | "weekly" | "daily" | "never";
  priority?: number;
}

interface BlogPost {
  slug: string;
  updatedAt: Date;
  createdAt: Date;
}

interface BlogCategory {
  name: string;
}

export async function GET() {
  const baseUrl = "https://blog.nexgeno.in";

  const posts: BlogPost[] = await db.post.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true, createdAt: true },
  });

  const categories: BlogCategory[] = await db.category.findMany({
    select: { name: true },
  });

  const staticEntries = [
    "",
    "/blog",
  ].map((path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>
  `);

  const postEntries = posts.map((post) => `
    <url>
      <loc>${baseUrl}/posts/${encodeURIComponent(post.slug)}</loc>
      <lastmod>${(post.updatedAt || post.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  `);

  const categoryEntries = categories.map((category) => `
    <url>
      <loc>${baseUrl}/?categoryId=${encodeURIComponent(category.name)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>
  `);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticEntries, ...postEntries, ...categoryEntries].join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
