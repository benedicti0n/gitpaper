/*
  Warnings:

  - You are about to drop the column `githubData` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubData";

-- AlterTable
ALTER TABLE "UserWallpaper" ADD COLUMN     "githubData" TEXT NOT NULL DEFAULT '';
