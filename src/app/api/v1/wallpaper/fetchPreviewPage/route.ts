import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { wallpaperId } = await req.json()

    try {
        const wallpaper = await prisma.userWallpaper.findUnique({
            where: { id: wallpaperId },
            select: {
                bentoLink: true,
                backgroundImageLink: true,
            }
        })

        return NextResponse.json({ success: true, bentoAndBgWallpaperLink: wallpaper }, { status: 200 });
    } catch (error) {
        console.error("Wallpaper Fetching error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}