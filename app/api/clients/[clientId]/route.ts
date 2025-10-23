import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const client = await db.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await db.client.delete({
      where: {
        id: params.clientId,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
