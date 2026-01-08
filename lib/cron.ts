import cron from "node-cron";
import prisma from "./prisma";

export function startPostScheduler() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const posts = await prisma.post.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: { lte: now },
      },
    });

    for (const post of posts) {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: "PUBLISHED",
          publishedAt: new Date(),
        },
      });
    }
  });
}
