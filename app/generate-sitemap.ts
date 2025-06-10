import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import "dotenv/config";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateSitemap() {
  const staticUrls = ["/", "/blog"];

  const services = await db.services.findMany({
    where: { showInMenu: true },
  });

  const dynamicUrls = services.map((service) => `/services/${service.slug}`);
  const allUrls = [...staticUrls, ...dynamicUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `<url>
  <loc>${baseUrl}${url}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${url === "/" ? "1.0" : "0.8"}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  const filePath = path.resolve("public", "sitemap.xml");
  await writeFile(filePath, xml);
}
