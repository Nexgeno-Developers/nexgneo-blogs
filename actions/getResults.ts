import { db } from "@/lib/db";

export const getResults = async () => {
  try {
    const results = await db.result.findMany({
      orderBy: { title: "asc" },
    });
    return results;
  } catch (error) {
    console.log("GET_RESULTS", error);
    return [];
  }
};