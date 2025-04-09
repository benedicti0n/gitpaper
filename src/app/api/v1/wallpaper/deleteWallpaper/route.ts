import { NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { wallpaperId, platformOf, userId } = body;

        console.log(wallpaperId, platformOf, userId);


        if (!wallpaperId || !platformOf || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Delete from Prisma
        await prisma.userWallpaper.delete({
            where: { id: wallpaperId },
        });

        // Delete from S3
        const fileName = `${userId}-${platformOf}.png`;
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
        };

        await s3.send(new DeleteObjectCommand(deleteParams));

        return NextResponse.json({ message: "Wallpaper deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
