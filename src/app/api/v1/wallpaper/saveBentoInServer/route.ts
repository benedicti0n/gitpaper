// app/api/save-bento/route.ts
import { NextResponse } from 'next/server';
import s3 from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const bentoImage = formData.get('bentoImage') as File;
        const bentoImageName = formData.get('bentoImageName') as string;

        if (!bentoImage) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const arrayBufferBento = await bentoImage.arrayBuffer();
        const bufferBento = Buffer.from(arrayBufferBento);

        const uploadParamsForBento = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: bentoImageName,
            Body: bufferBento,
            ContentType: bentoImage.type,
        };
        await s3.send(new PutObjectCommand(uploadParamsForBento));

        return NextResponse.json({
            success: true,
            message: "New version of Old Bento saved successfully"
        });

    } catch (error) {
        console.error('Error saving Bento:', error);
        return NextResponse.json(
            { error: 'Failed to process Bento' },
            { status: 500 }
        );
    }
}