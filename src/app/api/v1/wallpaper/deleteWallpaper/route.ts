import { NextResponse } from 'next/server';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3';
import { prisma } from '@/lib/prisma';

const getFileNameFromUrl = (url: string) => url.substring(url.lastIndexOf('/') + 1);

const S3_BASE_URL = process.env.S3_BASE_URL

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { wallpaperId, platformOf } = body;

        if (!wallpaperId || !platformOf) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const wallpaper = await prisma.userWallpaper.findUnique({
            where: { id: wallpaperId },
            select: {
                bentoLink: true,
                backgroundImageLink: true,
            },
        });

        if (!wallpaper) {
            return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
        }

        const objectsToDelete = [];

        // Always delete the bento image
        const bentoImageName = getFileNameFromUrl(wallpaper.bentoLink);
        objectsToDelete.push({ Key: bentoImageName });

        // Only delete the background image if it is an S3 object
        if (wallpaper.backgroundImageLink.startsWith(S3_BASE_URL!)) {
            const backgroundImageName = getFileNameFromUrl(wallpaper.backgroundImageLink);
            objectsToDelete.push({ Key: backgroundImageName });
        }

        if (objectsToDelete.length > 0) {
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Delete: {
                    Objects: objectsToDelete,
                    Quiet: false,
                },
            };
            await s3.send(new DeleteObjectsCommand(deleteParams));
        }

        await prisma.userWallpaper.delete({
            where: { id: wallpaperId },
        });

        return NextResponse.json({ message: "Wallpaper deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
