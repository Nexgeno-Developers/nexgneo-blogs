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
      altTag,
      image,
      desc,
      slug,
      metaTitle,
      metaDesc,
      content,
      whyChoose,
    } = await req.json();

    const solution = await db.solutions.create({
      data: {
        title,
        altTag,
        image,
        desc,
        slug,
        metaTitle,
        metaDesc,
        content,
        whyChoose,
      },
    });

    return NextResponse.json(solution);
  } catch (error) {
    console.log("[SOLUTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
