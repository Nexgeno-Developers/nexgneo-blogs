import { db } from "@/lib/db";
import { Post } from "@prisma/client";

type getPosts = {
  title?: string;
  categoryId?: string;
};

export const getPosts = async ({
  title,
  categoryId,
}: getPosts): Promise<Post[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
          mode: "insensitive",
        },
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.log("[GET_POSTS]", error);
    return [];
  }
};
