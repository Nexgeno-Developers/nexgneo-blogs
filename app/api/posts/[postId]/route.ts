import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const values = await req.json();

    const post = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postPublished = await db.post.findUnique({
      where: {
        id: params.postId,
        isPublished: true,
      },
    });

    if (postPublished) {
      return new NextResponse("This post not delete is Published", {
        status: 404,
      });
    }

    const post = await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
