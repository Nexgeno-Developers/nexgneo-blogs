import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { deleteResource } from "@/lib/cloudinary";

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { publicId, resourceType } = await req.json();
    if (!publicId) return new NextResponse("Missing publicId", { status: 400 });

    await deleteResource(publicId, (resourceType as any) || "image");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[MEDIA_DELETE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
