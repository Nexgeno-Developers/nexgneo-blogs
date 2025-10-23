import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { resultId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const result = await db.result.update({
      where: {
        id: params.resultId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[RESULT_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { resultId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await db.result.delete({
      where: {
        id: params.resultId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[RESULT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
