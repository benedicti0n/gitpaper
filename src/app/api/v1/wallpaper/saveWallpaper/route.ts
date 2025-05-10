import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/s3";
import { prisma } from "@/lib/prisma";
import { Platform } from "@prisma/client";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const bentoImageFile = formData.get("bentoImage") as File | null;
    const platformOf = formData.get("platformOf")!.toString();
    const backgroundImage = formData.get("backgroundImage") as File | null; // if this field is not sent from frontend then the field will be null.
    const backgroundImageUrl = formData.get("backgroundImageUrl")?.toString();
    const githubUsername = formData.get("githubUsername")!.toString();
    const userId = formData.get("userId")!.toString();

    if (!bentoImageFile || !platformOf || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 500 }
      );
    }
    const platformUpperCase = platformOf.toUpperCase();
    if (!Object.values(Platform).includes(platformUpperCase as Platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 500 });
    }

    const uuid = randomUUID();
    const bentoImageFileName = `${platformOf}-${uuid}.png`;

    // Convert files to buffers for Bento Component
    const arrayBufferBento = await bentoImageFile.arrayBuffer();
    const bufferBento = Buffer.from(arrayBufferBento);
    const uploadParamsForBento = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: bentoImageFileName,
      Body: bufferBento,
      ContentType: bentoImageFile.type,
    };
    await s3.send(new PutObjectCommand(uploadParamsForBento));
    const bentoWallpaperS3Link = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${bentoImageFileName}`;

    // Convert files to buffers for Background image if its data: or imageUrl itself
    let backgroundWallpaperS3Link = "";

    // Handle File upload case
    if (backgroundImage) {
      backgroundWallpaperS3Link = await handleBackgroundImageFile(
        backgroundImage,
        uuid
      );
    } else if (backgroundImageUrl) {
      backgroundWallpaperS3Link = handleBackgroundImageUrl(backgroundImageUrl);
    } else {
      return NextResponse.json(
        { error: "Missing background image or URL" },
        { status: 400 }
      );
    }

    const existingWallpapersCount = await prisma.userWallpaper.count({
      where: {
        userId,
        platform: platformUpperCase as Platform,
      },
    });

    if (existingWallpapersCount >= 3) {
      return NextResponse.json(
        { error: "You already have 3 wallpapers for this platform" },
        { status: 400 }
      );
    }

    const newWallpaper = await prisma.userWallpaper.create({
      data: {
        platform: platformUpperCase as Platform,
        bentoLink: bentoWallpaperS3Link,
        backgroundImageLink: backgroundWallpaperS3Link,
        githubUsername,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Wallpaper saved", newWallpaper },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleBackgroundImageFile(file: File, uuid: string) {
  const backgroundImageName = `background_${uuid}.png`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: backgroundImageName,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${backgroundImageName}`;
}

function handleBackgroundImageUrl(url: string) {
  return url;
}
