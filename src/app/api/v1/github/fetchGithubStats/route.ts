import { NextResponse } from 'next/server'
import { fetchUserDetails } from '@/lib/github'
import { fetchContributions } from '@/lib/fetchContribution/fetchContributions'

export async function POST(req: Request) {
    try {
        const { username } = await req.json()
        console.log(username);

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 })
        }

        const userDetails = await fetchUserDetails(username)
        const streakStats = await fetchContributions(username)

        return NextResponse.json({ userDetails, streakStats }, { status: 200 })
    } catch (error) {
        console.error("GitHub Stats Fetch Error:", error)
        return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 })
    }
}
