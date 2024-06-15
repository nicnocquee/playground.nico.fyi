/*
  Warnings:

  - Added the required column `year` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
