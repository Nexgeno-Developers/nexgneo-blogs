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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isPublished");

    const posts = await db.post.findMany({
      where: {
        categoryId,
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[POSTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
