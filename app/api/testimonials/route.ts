import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const testimonial = await db.testimonial.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
