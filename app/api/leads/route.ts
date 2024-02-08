import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, country, message } = await req.json();

    const leads = await db.leads.create({
      data: {
        name,
        email,
        country,
        message,
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.log("[LEADS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
