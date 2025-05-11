-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubData" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "UserWallpaper" ADD COLUMN     "theme" TEXT NOT NULL DEFAULT '';
