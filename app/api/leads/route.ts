import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, last, email, country, mobile, subject, message } =
      await req.json();

    const leads = await db.leads.create({
      data: {
        name,
        last,
        email,
        country,
        mobile,
        subject,
        message,
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.log("[LEADS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
