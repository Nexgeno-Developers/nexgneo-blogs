import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const testimonial = await db.testimonial.update({
      where: { id: params.testimonialId },
      data: { ...values },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const testimonial = await db.testimonial.delete({
      where: { id: params.testimonialId },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
