import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const portfolio = await db.portfolio.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.log("[SOLUTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
