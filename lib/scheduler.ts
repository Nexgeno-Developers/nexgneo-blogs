import cron from "node-cron";
import prisma from "./prisma";
import { PostStatus } from "@prisma/client";

let started = false;

export function startPostScheduler() {
  if (started) return;
  started = true;

  console.log("🕒 Post scheduler started");

  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const posts = await prisma.post.findMany({
        where: {
          status: PostStatus.SCHEDULED,
          scheduledAt: { lte: now },
        },
      });

      for (const post of posts) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: PostStatus.PUBLISHED,
            isPublished: true,
            publishedAt: now,
            scheduledAt: null,
          },
        });
      }

      if (posts.length > 0) {
        console.log(`✅ Published ${posts.length} scheduled posts`);
      }
    } catch (err) {
      console.error("❌ Scheduler error:", err);
    }
  });
}
