import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, role, company, videoUrl, order } = body;

    if (!videoUrl || typeof videoUrl !== "string") {
      return NextResponse.json(
        { message: "Video URL is required" },
        { status: 400 }
      );
    }

    const testimonial = await db.videoTestimonial.create({
      data: {
        name: name ?? "",
        role: role ?? "",
        company: company ?? "",
        videoUrl,
        order: order ?? 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("[VIDEO_TESTIMONIAL_CREATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const testimonials = await db.videoTestimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
