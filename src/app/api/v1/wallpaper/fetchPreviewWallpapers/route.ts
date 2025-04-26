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
                id: true,
                bentoLink: true,
                backgroundImageLink: true,
            }
        })

        type FormattedWallpaper = {
            wallpaperId: string;
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


        console.log(formattedWallpapers);

        return NextResponse.json({ success: true, wallpapers: formattedWallpapers }, { status: 200 });
    } catch (error) {
        console.error("Wallpaper Fetching error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}