import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await req.json()

    try {
        const wallpapers = await prisma.userWallpaper.findMany({
            where: { userId },
            select: {
                id: true,
                platform: true,
                githubUsername: true,
                bentoLink: true,
                backgroundImageLink: true,
            }
        })

        type FormattedWallpaper = {
            wallpaperId: string;
            githubUsername: string;
            bentoLink: string;
            backgroundImageLink: string;
        };

        const formattedWallpapers: {
            extension: FormattedWallpaper[];
            mobile: FormattedWallpaper[];
            desktop: FormattedWallpaper[];
        } = {
            extension: [],
            mobile: [],
            desktop: [],
        };

        wallpapers.forEach(wallpaper => {
            const entry: FormattedWallpaper = {
                wallpaperId: wallpaper.id,
                githubUsername: wallpaper.githubUsername,
                bentoLink: wallpaper.bentoLink,
                backgroundImageLink: wallpaper.backgroundImageLink,
            };

            if (wallpaper.platform === 'EXTENSION') {
                formattedWallpapers.extension.push(entry);
            } else if (wallpaper.platform === 'MOBILE') {
                formattedWallpapers.mobile.push(entry);
            } else if (wallpaper.platform === 'DESKTOP') {
                formattedWallpapers.desktop.push(entry);
            }
        });

        return NextResponse.json({ success: true, wallpapers: formattedWallpapers }, { status: 200 });
    } catch (error) {
        console.error("Wallpaper Fetching error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}