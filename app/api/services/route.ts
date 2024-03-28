import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

<<<<<<< HEAD
    const { title, image, desc, slug, metaTitle, metaDesc, content } =
      await req.json();
=======
    const {
      title,
      image,
      desc,
      slug,
      metaTitle,
      metaDesc,
      h1Title,
      h1Desc,
      h2Title,
      h2Desc,
    } = await req.json();
>>>>>>> 3dc6dfed4b04963d3da9876e36a12ce8a612c263

    const service = await db.services.create({
      data: {
        title,
        image,
        desc,
        slug,
        metaTitle,
        metaDesc,
<<<<<<< HEAD
        content,
=======
        h1Title,
        h1Desc,
        h2Title,
        h2Desc,
>>>>>>> 3dc6dfed4b04963d3da9876e36a12ce8a612c263
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
