import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { technologyId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const technology = await db.technology.update({
      where: {
        id: params.technologyId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(technology);
  } catch (error) {
    console.log("[TECHNOLOGY_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { technologyId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const technology = await db.technology.delete({
      where: {
        id: params.technologyId,
      },
    });

    return NextResponse.json(technology);
  } catch (error) {
    console.log("[TECHNOLOGY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
