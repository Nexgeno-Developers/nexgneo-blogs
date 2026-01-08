import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { videotestimonialId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const values = await req.json();

    const testimonial = await db.videoTestimonial.update({
      where: {
        id: params.videotestimonialId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("[VIDEO_TESTIMONIAL_UPDATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { videotestimonialId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const testimonial = await db.videoTestimonial.delete({
      where: {
        id: params.videotestimonialId,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("[VIDEO_TESTIMONIAL_DELETE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
