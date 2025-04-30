import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      {
        error: "userId required",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const wallpapers = await prisma.userWallpaper.findMany({
      where: {
        userId: userId,
        platform: "EXTENSION",
      },
    });

    return NextResponse.json(
      {
        message: "Wallpapers fetched successfully",
        wallpapers,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
