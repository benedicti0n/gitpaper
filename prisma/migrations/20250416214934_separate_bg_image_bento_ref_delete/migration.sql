/*
  Warnings:

  - You are about to drop the column `link` on the `UserWallpaper` table. All the data in the column will be lost.
  - You are about to drop the column `ref` on the `UserWallpaper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserWallpaper" DROP COLUMN "link",
DROP COLUMN "ref",
ADD COLUMN     "backgroundImageLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bentoLink" TEXT NOT NULL DEFAULT '';
