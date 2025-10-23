import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { listResources } from "@/lib/cloudinary";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const nextCursor = searchParams.get("nextCursor") || undefined;
    const resourceTypeParam = (searchParams.get("resource_type") || "all") as
      | "image"
      | "video"
      | "all";
    const maxResults = Number(searchParams.get("max_results") || 30);

    const expression = q ? `${q}` : undefined;
    const { resources, nextCursor: cursor } = await listResources({
      nextCursor,
      maxResults,
      resourceType: resourceTypeParam,
      expression,
    });

    return NextResponse.json({ items: resources, nextCursor: cursor });
  } catch (e) {
    console.error("[MEDIA_LIST]", e);
    return NextResponse.json(
      { error: "Internal Error", details: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}