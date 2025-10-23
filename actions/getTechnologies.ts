import { db } from "@/lib/db";

export const getTechnologies = async () => {
  try {
    const technologies = await db.technology.findMany({
      orderBy: { title: "asc" },
    });
    return technologies;
  } catch (error) {
    console.log("GET_TECHNOLOGIES", error);
    return [];
  }
};