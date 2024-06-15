-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_albumId_fkey";

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
