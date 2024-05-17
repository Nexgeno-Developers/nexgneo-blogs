import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { hireDeveloperId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const values = await req.json();

    const hireDeveloper = await db.hireDeveloper.update({
      where: {
        id: params.hireDeveloperId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(hireDeveloper);
  } catch (error) {
    console.log("[HIRE_DEVELOPER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hireDeveloperId: string } }
) {
  try {
    const user = currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hireDeveloper = await db.hireDeveloper.delete({
      where: {
        id: params.hireDeveloperId,
      },
    });

    return NextResponse.json(hireDeveloper);
  } catch (error) {
    console.log("[HIRE_DEVELOPER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
