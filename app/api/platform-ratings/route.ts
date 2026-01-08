import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const ratings = await db.platformRating.findMany({
      orderBy: {
        platform: "asc",
      },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    console.log("[GET_PLATFORM_RATINGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { platform, rating, reviewCount } = await req.json();

    if (!platform || rating === undefined || reviewCount === undefined) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upsert: update if exists, create if not
    const platformRating = await db.platformRating.upsert({
      where: { platform },
      update: {
        rating: parseFloat(rating),
        reviewCount: parseInt(reviewCount),
      },
      create: {
        platform,
        rating: parseFloat(rating),
        reviewCount: parseInt(reviewCount),
      },
    });

    return NextResponse.json(platformRating);
  } catch (error) {
    console.log("[UPDATE_PLATFORM_RATING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
