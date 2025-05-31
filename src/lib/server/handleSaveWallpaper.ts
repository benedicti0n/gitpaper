import { toPng } from 'html-to-image';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

interface SaveWallpaperParams {
  element: HTMLElement;
  githubUsername: string;
  userId: string;
  theme: string;
}

export const saveWallpaperToS3 = async ({
  element,
  githubUsername,
  userId,
  theme,
}: SaveWallpaperParams): Promise<{ success: boolean; imageUrl?: string; error?: string }> => {
  // Log the parameters for debugging
  console.log('Saving wallpaper with params:', {
    githubUsername,
    userId,
    theme,
  });
  try {
    // 1. Convert component to image data URL
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      quality: 1,
    });

    // 2. Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // 3. Generate unique filename
    const uuid = randomUUID();
    const bentoImageFileName = `${platform}-${uuid}.png`;

    // 4. Upload to S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: bentoImageFileName,
      Body: buffer,
      ContentType: 'image/png',
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // 5. Return the public URL
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${bentoImageFileName}`;

    return { success: true, imageUrl };
  } catch (error) {
    console.error('Error saving wallpaper:', error);
    return { success: false, error: 'Failed to save wallpaper' };
  }
};
