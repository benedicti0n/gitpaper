import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3';
import { prisma } from '@/lib/prisma';
import { Platform } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get('image') as File | null;
        const platformOf = formData.get('platformOf')?.toString();
        const backgroundImage = formData.get('backgroundImage') as File | null;
        const backgroundImageUrl = formData.get('backgroundImageUrl')?.toString();

        const userId = formData.get('userId')?.toString();

        if (!file || !platformOf || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const platformUpperCase = platformOf.toUpperCase();

        if (!Object.values(Platform).includes(platformUpperCase as Platform)) {
            return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
        }

        const fileName = `${userId}-${platformOf}.png`;
        const backgroundImageName = `background_${Date.now()}_${userId}.png`;

        // Convert files to buffers for Bento Component
        const arrayBufferBento = await file.arrayBuffer();
        const bufferBento = Buffer.from(arrayBufferBento);
        const uploadParamsForBento = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: bufferBento,
            ContentType: file.type,
        };
        await s3.send(new PutObjectCommand(uploadParamsForBento));


        // Convert files to buffers for Background image if its data: or imageUrl itself
        let backgroundWallpaperS3Link = '';

        // Handle File upload case
        if (backgroundImage) {
            const bufferBackgroundImage = Buffer.from(await backgroundImage.arrayBuffer());
            const uploadParamsForBackgroundImage = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: backgroundImageName,
                Body: bufferBackgroundImage,
                ContentType: backgroundImage.type,
            };
            await s3.send(new PutObjectCommand(uploadParamsForBackgroundImage));
            backgroundWallpaperS3Link = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${backgroundImageName}`;
        } else if (backgroundImageUrl) {
            backgroundWallpaperS3Link = backgroundImageUrl;
        }

        const bentoWallpaperS3Link = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const newWallpaper = await prisma.userWallpaper.create({
            data: {
                platform: platformUpperCase as Platform,
                bentoLink: bentoWallpaperS3Link,
                backgroundImageLink: backgroundWallpaperS3Link,
                userId,
            },
        });

        return NextResponse.json({ message: 'Wallpaper saved', newWallpaper }, { status: 201 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
