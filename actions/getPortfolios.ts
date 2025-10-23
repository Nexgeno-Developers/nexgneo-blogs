import { db } from "@/lib/db";

export const getPortfolios = async () => {
  try {
    const portfolios = await db.portfolio.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return portfolios;
  } catch (error) {
    console.log("GET_PORTFOLIOS", error);
    return [];
  }
};
