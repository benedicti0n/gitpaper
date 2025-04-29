import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password, userId } = await req.json();

  if (!username || !password || !userId) {
    return NextResponse.json(
      { error: "Missing required fields!" },
      { status: 400 }
    );
  }

  // Password validation
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const isLongEnough = password.length >= 5;

  if (!hasUpperCase || !hasNumeric || !isLongEnough) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 5 characters long and contain at least one uppercase letter and one number.",
        validationErrors: {
          hasUpperCase,
          hasNumeric,
          isLongEnough,
        },
      },
      { status: 400 }
    );
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { username, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Username and password set successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
