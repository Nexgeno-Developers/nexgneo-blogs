import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { leadId: string } }
) {
  try {
    const lead = await db.leads.delete({
      where: {
        id: params.leadId,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.log("[DELETE_LEAD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
