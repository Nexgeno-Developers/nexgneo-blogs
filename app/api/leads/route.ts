import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      last,
      email,
      city,
      region,
      country,
      mobile,
      subject,
      message,
    } = await req.json();

    const lead = await db.leads.create({
      data: {
        name,
        last,
        email,
        city,
        region,
        country,
        mobile,
        subject,
        message,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.log("[LEAD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
