import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { industriesId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const values = await req.json();

    const industry = await db.industries.update({
      where: {
        id: params.industriesId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(industry);
  } catch (error) {
    console.log("[INDUSTRY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { industriesId: string } }
) {
  try {
    const user = currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const industry = await db.industries.delete({
      where: {
        id: params.industriesId,
      },
    });

    return NextResponse.json(industry);
  } catch (error) {
    console.log("[INDUSTRY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
