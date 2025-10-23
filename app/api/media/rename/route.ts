import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { renameResource } from "@/lib/cloudinary";

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { fromPublicId, toPublicId, resourceType } = await req.json();
    if (!fromPublicId || !toPublicId)
      return new NextResponse("Missing ids", { status: 400 });

    await renameResource(
      fromPublicId,
      toPublicId,
      (resourceType as any) || "image"
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[MEDIA_RENAME]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
