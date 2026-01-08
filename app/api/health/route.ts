import { startPostScheduler } from "@/lib/scheduler";
import { NextResponse } from "next/server";

startPostScheduler();

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
