import { prismaClient } from "@/prisma/prisma-client";
import { pgboss } from "./pgboss";
import PgBoss from "pg-boss";

export const POST = async (req: Request) => {
  const start = performance.now();
  const { task } = await req.json();

  pgboss.on("error", (error) => console.error(error));

  await pgboss.start();

  const queue = "job-1";

  let jobId = await pgboss.send(queue, { task });

  console.log(`created job in queue ${queue}: ${jobId}`);

  await pgboss.work(queue, someAsyncJobHandler);

  const end = performance.now();
  console.log(`handler took ${end - start}ms`);

  return Response.json({ jobId });
};

async function someAsyncJobHandler(job: PgBoss.Job<{ task: string }>) {
  console.log(`staring job ${job.id}`);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await prismaClient.log.create({
    data: {
      data: job.data,
    },
  });
}
