import { db } from "@/lib/db";

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "yearly"
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "never";
  priority?: number;
}


export default async function sitemap(): Promise<SitemapEntry[]> {
  
  const posts = await db.post.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Fetch categories (assuming they have slugs)
  const categories = await db.category.findMany({
    select: { name: true, updatedAt: true },
  });

  // Static URLs
  const staticUrls: SitemapEntry[] = [
    {
      url: "https://blog.nexgeno.in/",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // Add other static pages if needed
  ];

   // Category URLs
   const categoryUrls: SitemapEntry[] = categories.map((category) => ({
    url: `https://blog.nexgeno.in/category/${category.name}`,
    lastModified:
      category.updatedAt?.toISOString() || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Posts URLs
  const postsUrls: SitemapEntry[] = posts.map((post) => ({
    url: `https://blog.nexgeno.in/${post.slug}`,
    lastModified: post.updatedAt?.toISOString() || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

 

  // Combine all
  const allUrls: SitemapEntry[] = [
    ...staticUrls,
    ...postsUrls,
    ...categoryUrls,
  ];

  return allUrls;
}
