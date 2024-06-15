import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
  if (!(global as any).prismaClient) {
    (global as any).prismaClient = new PrismaClient({
      log: ["info", "warn", "error"],
      errorFormat: "minimal"
    });
  }

  prismaClient = (global as any).prismaClient;
}

export { prismaClient };
