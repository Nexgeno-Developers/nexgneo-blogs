import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { solutionId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const values = await req.json();

    const solution = await db.solutions.update({
      where: {
        id: params.solutionId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(solution);
  } catch (error) {
    console.log("[SOLUTION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { solutionId: string } }
) {
  try {
    const user = currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const solution = await db.solutions.delete({
      where: {
        id: params.solutionId,
      },
    });

    return NextResponse.json(solution);
  } catch (error) {
    console.log("[SOLUTION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
