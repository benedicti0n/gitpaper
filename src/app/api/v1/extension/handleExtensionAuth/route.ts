import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password, userId } = await req.json()

    if (!username || !password || !userId) {
        return NextResponse.json({ error: "Missing required fields!" }, { status: 400 })
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { username, password }
        })

        return NextResponse.json({ message: "Username Password set successfully!" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}