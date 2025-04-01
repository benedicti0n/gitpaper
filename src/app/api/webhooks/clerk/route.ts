import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    const userId = evt.data.id
    const eventType = evt.type

    try {
        if (eventType === 'user.created') {
            // Save user to the database
            await prisma.user.create({
                data: {
                    id: userId,
                    email: evt.data.email_addresses[0].email_address,
                    platformsConnectedTo: {
                        create: {} // This will create a PlatformsConnectedTo with default values
                    }
                    // Add any other fields you need to save
                }
            })
        } else if (eventType === 'user.deleted') {
            // Check if user exists before attempting to delete
            const user = await prisma.user.findUnique({
                where: { id: userId },
            })

            if (!user) {
                return new Response('User not found', {
                    status: 404
                })
            }

            // Delete user and related records from the database
            await prisma.user.delete({
                where: { id: userId },
            })
        }
    } catch (error) {
        console.error('Database operation failed:', error)
        return new Response('Database operation failed', {
            status: 404
        })
    }
    return new Response('Webhook received', { status: 200 })
}