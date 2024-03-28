import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const values = await req.json();

    const service = await db.services.update({
      where: {
        id: params.serviceId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICE_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const user = currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const service = await db.services.delete({
      where: {
        id: params.serviceId,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[SERVICE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
