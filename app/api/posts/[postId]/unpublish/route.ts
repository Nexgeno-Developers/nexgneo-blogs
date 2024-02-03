import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    if (!post) {
      return new NextResponse("Missing Post", { status: 400 });
    }

    const unPublishedPost = await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedPost);
  } catch (error) {
    console.log("POST_UNPUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
