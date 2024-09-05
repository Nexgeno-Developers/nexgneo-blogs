import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const industry = await db.industries.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(industry);
  } catch (error) {
    console.log("[INDUSTRIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
