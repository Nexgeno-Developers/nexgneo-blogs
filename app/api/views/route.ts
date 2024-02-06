import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const postData = await req.json();

    const { postId } = postData;
    const visitor = await db.postVisitor.create({
      data: {
        postId,
      },
    });
    return NextResponse.json(visitor);
  } catch (error) {
    console.log("[VIEWS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
