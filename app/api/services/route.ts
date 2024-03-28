import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, image, desc, slug, metaTitle, metaDesc, content } =
      await req.json();

    const service = await db.services.create({
      data: {
        title,
        image,
        desc,
        slug,
        metaTitle,
        metaDesc,
        content,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
