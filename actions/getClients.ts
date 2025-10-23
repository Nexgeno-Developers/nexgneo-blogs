import { db } from "@/lib/db";

export const getClients = async () => {
  try {
    const clients = await db.client.findMany({
      orderBy: { name: "asc" },
    });
    return clients;
  } catch (error) {
    console.log("GET_CLIENTS", error);
    return [];
  }
};