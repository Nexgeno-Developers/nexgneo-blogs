import { db } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const baseUrl = "https://blog.nexgeno.in";

export async function GET() {
  try {
    console.log("✅ /sitemap endpoint hit");

    // Static URLs
    const staticUrls = ["", "/blog"];

    const staticEntries = staticUrls.map((url) => `
      <url>
        <loc>${baseUrl}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url === "" ? "1.0" : "0.8"}</priority>
      </url>
    `);

    // Services
    const services = await db.services.findMany({
      where: { showInMenu: true },
      select: { slug: true },
    });

    const serviceEntries = services.map((item) => `
      <url>
        <loc>${baseUrl}/services/${encodeURIComponent(item.slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);

    // Blog Posts
    const posts = await db.post.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });

    const blogEntries = posts.map((post) => {
      const safeSlug = post.slug //.endsWith(".htm") ? post.slug : `${post.slug}.htm`;
      return `
        <url>
          <loc>${baseUrl}/posts/${encodeURIComponent(safeSlug)}</loc>
          <lastmod>${(post.updatedAt || post.createdAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.5</priority>
        </url>
      `;
    });
    

    // Dynamic Categories
    const categories = await db.category.findMany({
      select: { name: true },
    });

    const categoryEntries = categories.map((category) => `
      <url>
        <loc>${baseUrl}/?categoryId=${encodeURIComponent(category.name)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
    `);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...staticEntries,
  ...serviceEntries,
  ...blogEntries,
  ...categoryEntries,
].join("")}
</urlset>`;

    // Save it to public/sitemap.xml (optional, if you want it served statically)
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    await fs.writeFile(filePath, sitemap, "utf-8");

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });

  } catch (error) {
    console.error("❌ Sitemap error:", error);
    return new Response("❌ Failed to generate sitemap", { status: 500 });
  }
}
