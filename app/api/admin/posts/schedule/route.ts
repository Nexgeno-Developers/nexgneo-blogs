// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { PostStatus } from "@prisma/client";

// export async function POST(req: Request) {
//   try {
//     const { postId, scheduledAt } = await req.json();

//     if (!postId || !scheduledAt) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const date = new Date(scheduledAt);
//     if (date <= new Date()) {
//       return NextResponse.json(
//         { error: "Scheduled date must be future" },
//         { status: 400 }
//       );
//     }

//     const post = await prisma.post.update({
//       where: { id: postId },
//       data: {
//         // status: "SCHEDULED",
//         status: PostStatus.SCHEDULED,
//         scheduledAt: date,
//       },
//     });

//     return NextResponse.json({ success: true, post });
//   } catch (error) {
//     console.error("Schedule error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { postId, scheduledAt } = await req.json();

    if (!postId || !scheduledAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const scheduleDate = new Date(scheduledAt);
    if (scheduleDate <= new Date()) {
      return NextResponse.json(
        { error: "Scheduled date must be in the future" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        status: PostStatus.SCHEDULED,
        isPublished: false,
        scheduledAt: scheduleDate,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Schedule error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

