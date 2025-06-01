// app/api/capture/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { prisma } from '@/lib/prisma';

// This will run via cron job
export async function GET() {
    let browser;

    try {
        // 1. Fetch all wallpapers that need updating
        const userWallpapers = await prisma.userWallpaper.findMany({
            select: {
                id: true,
                githubUsername: true,
                theme: true,
                bentoLink: true,
                bentoMiniImages: true
            },
            where: {
                githubUsername: {
                    not: ""
                }
            }
        });

        console.log(`Starting capture for ${userWallpapers.length} wallpapers`);

        // 2. Launch the browser once
        // Simple browser launch configuration
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu',
                '--disable-software-rasterizer'
            ],
            headless: true,
            defaultViewport: { width: 2000, height: 2000 },
            ...(process.env.NODE_ENV === 'production' && {
                executablePath: '/usr/bin/google-chrome-stable'
            })
        });


        // 3. Process each wallpaper
        for (const wallpaper of userWallpapers) {
            let page;

            try {
                console.log(`Processing wallpaper for user: ${wallpaper.githubUsername}`);

                // 3.2 Extract image name from bentoLink
                const imageName = wallpaper.bentoLink?.split('/').pop();
                if (!imageName) {
                    console.error(`No image name found in bentoLink for user ${wallpaper.githubUsername}`);
                    continue;
                }

                // 3.3 Take screenshot of the bento page
                page = await browser.newPage();
                await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/bento/${wallpaper.id}?serverCapture=true&githubUsername=${wallpaper.githubUsername}&theme=${wallpaper.theme}&bentoMiniImages=${wallpaper.bentoMiniImages}&imageName=${imageName}`, {
                    waitUntil: 'networkidle0',
                    timeout: 30000
                });
                console.log(`Screenshot taken for user: ${wallpaper.githubUsername}`);
            } catch (error) {
                console.error(`Error processing wallpaper for ${wallpaper.githubUsername}:`, error);
            } finally {
                if (page) {
                    await page.close();
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully processed ${userWallpapers.length} wallpapers`
        });

    } catch (error) {
        console.error('Error in capture route:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to process wallpapers'
            },
            { status: 500 }
        );
    } finally {
        if (browser) {
            // @ts-expect-error idk
            await browser.close();
        }
    }
}