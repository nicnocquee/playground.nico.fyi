/*
  Warnings:

  - The primary key for the `albums` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `albums` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `songs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `songs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `albumId` on the `songs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_albumId_fkey";

-- AlterTable
ALTER TABLE "albums" DROP CONSTRAINT "albums_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "albums_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "songs" DROP CONSTRAINT "songs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "albumId",
ADD COLUMN     "albumId" INTEGER NOT NULL,
ADD CONSTRAINT "songs_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "songs_albumId_idx" ON "songs"("albumId");

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
