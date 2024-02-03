import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const values = await req.json();

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
