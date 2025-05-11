/*
  Warnings:

  - The `githubData` column on the `UserWallpaper` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserWallpaper" DROP COLUMN "githubData",
ADD COLUMN     "githubData" JSONB NOT NULL DEFAULT '{}';
