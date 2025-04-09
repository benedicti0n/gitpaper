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
        const ref = formData.get('ref')?.toString();
        const userId = formData.get('userId')?.toString();

        if (!file || !platformOf || !ref || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const platformUpperCase = platformOf.toUpperCase();

        if (!Object.values(Platform).includes(platformUpperCase as Platform)) {
            return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
        }

        const fileName = `${userId}-${platformOf}.png`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const wallpaperS3Link = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const newWallpaper = await prisma.userWallpaper.create({
            data: {
                platform: platformUpperCase as Platform,
                link: wallpaperS3Link,
                ref,
                userId,
            },
        });

        return NextResponse.json({ message: 'Wallpaper saved', newWallpaper }, { status: 201 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
