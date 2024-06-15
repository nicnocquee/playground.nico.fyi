import { prismaClient } from "@/prisma/prisma-client";
import { revalidatePath } from "next/cache";

export const seedData = async () => {
  for (let i = 0; i < 100; i++) {
    await prismaClient.album.create({
      data: {
        name: `Album ${i + 1}`,
        artist: `Artist ${i + 1}`,
        year: 1900 + i,
        songs: {
          createMany: {
            data: Array.from({ length: 100 }, (_, j) => ({
              name: `Song ${i + 1} ${j + 1}`,
              album: `Album ${i + 1}`,
              artist: `Artist ${i + 1}`,
              year: 1900 + i,
            })),
          },
        },
      },
    });
  }
  revalidatePath("/suspense/with-prisma");

  return true;
};

export const clearData = async () => {
  await prismaClient.album.deleteMany();
  await prismaClient.song.deleteMany();
  revalidatePath("/suspense/with-prisma");
};
