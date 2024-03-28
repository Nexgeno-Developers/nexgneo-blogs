import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Post } from "@prisma/client";

export const getMyPosts = async (): Promise<Post[]> => {
  const user = await currentUser();
  try {
    const myPosts = await db.post.findMany({
      where: {
        authorId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return myPosts;
  } catch (error) {
    console.log("[GET_MY_POSTS]", error);
    return [];
  }
};
