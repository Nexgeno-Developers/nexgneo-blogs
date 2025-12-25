import { db } from "@/lib/db";

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    // Ensure we return an array even if categories is null/undefined
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("GET_CATEGORIES", error);
    // Return empty array on any error
    return [];
  }
};
