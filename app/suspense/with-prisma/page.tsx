import { prismaClient } from "@/prisma/prisma-client";
import Albums from "../hoisted-client/albums";
import Songs from "../hoisted-client/songs";

export default function Page() {
  const albums = prismaClient.album.findMany({ take: 100 });
  const songs = prismaClient.song.findMany({ take: 100 });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Suspense Hoisted Race Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <Albums dataSource={albums} />
        <Songs dataSource={songs} />
      </div>
    </div>
  );
}
