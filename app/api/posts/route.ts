import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const {
      title,
      slug,
      description,
      textEditor,
      image,
      metaTitle,
      metaDesc,
      categoryId,
    } = await req.json();

    const post = await db.post.create({
      data: {
        title,
        slug,
        description,
        textEditor,
        image,
        metaTitle,
        metaDesc,
        categoryId,
        authorId: user?.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
