import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()
    const { userId } = body

    try {
        const wallpapers = await prisma.userWallpaper.findMany({
            where: { userId },
            select: {
                platform: true,
                link: true,
                id: true,
            }
        })

        const formattedWallpapers = {
            extension: [{ wallpaperId: '', link: [''] }],
            mobile: [{ wallpaperId: '', link: [''] }],
            desktop: [{ wallpaperId: '', link: [''] }],
        };

        wallpapers.forEach(wallpaper => {
            if (wallpaper.platform === 'EXTENSION') {
                formattedWallpapers.extension[0].wallpaperId = wallpaper.id;
                formattedWallpapers.extension[0].link = [wallpaper.link];
            } else if (wallpaper.platform === 'MOBILE') {
                formattedWallpapers.mobile[0].wallpaperId = wallpaper.id;
                formattedWallpapers.mobile[0].link = [wallpaper.link];
            } else if (wallpaper.platform === 'DESKTOP') {
                formattedWallpapers.desktop[0].wallpaperId = wallpaper.id;
                formattedWallpapers.desktop[0].link = [wallpaper.link];
            }
        });

        return NextResponse.json({ success: true, wallpapers: formattedWallpapers }, { status: 200 });
    } catch (error) {
        console.error("Wallpaper Fetching error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}