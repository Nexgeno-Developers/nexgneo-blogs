import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, altTag, image, desc, slug, metaTitle, metaDesc, content } =
      await req.json();

    const hireDeveloper = await db.hireDeveloper.create({
      data: {
        title,
        altTag,
        image,
        desc,
        slug,
        metaTitle,
        metaDesc,
        content,
      },
    });

    return NextResponse.json(hireDeveloper);
  } catch (error) {
    console.log("[HIRE_DEVELOPER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
