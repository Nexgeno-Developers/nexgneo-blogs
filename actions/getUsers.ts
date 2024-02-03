import { db } from "@/lib/db";

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error) {
    console.log("GET_USERS", error);
    return [];
  }
};
