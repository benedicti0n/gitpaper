// app/api/capture/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { prisma } from '@/lib/prisma';

// Configure Chromium for production
chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

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

        // 2. Configure browser based on environment
        const isDev = process.env.NODE_ENV === 'development';
        
        if (isDev) {
            // Development configuration with local Chrome
            browser = await launchLocalBrowser();
        } else {
            // Production configuration with @sparticuz/chromium
            console.log('Using @sparticuz/chromium for production');
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: { width: 1920, height: 1080 },
                executablePath: await chromium.executablePath(),
                headless: true
            });
        }

        // 3. Process each wallpaper
        for (const wallpaper of userWallpapers) {
            let page;

            try {
                console.log(`Processing wallpaper for user: ${wallpaper.githubUsername}`);

                // Extract image name from bentoLink
                const imageName = wallpaper.bentoLink?.split('/').pop();
                if (!imageName) {
                    console.error(`No image name found in bentoLink for user ${wallpaper.githubUsername}`);
                    continue;
                }

                // Take screenshot of the bento page
                page = await browser.newPage();
                await page.goto(
                    `${process.env.NEXT_PUBLIC_APP_URL}/bento/${wallpaper.id}?` + 
                    `serverCapture=true&githubUsername=${wallpaper.githubUsername}` + 
                    `&theme=${wallpaper.theme}&bentoMiniImages=${wallpaper.bentoMiniImages}` + 
                    `&imageName=${imageName}`, 
                    {
                        waitUntil: 'networkidle0',
                        timeout: 30000
                    }
                );
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
            await browser.close();
        }
    }
}

async function launchLocalBrowser() {
    const isMac = process.platform === 'darwin';
    const isWindows = process.platform === 'win32';
    let chromeExecutablePath = process.env.CHROME_EXECUTABLE_PATH;

    if (!chromeExecutablePath) {
        if (isMac) {
            chromeExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        } else if (isWindows) {
            chromeExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
        } else {
            // Try common Linux paths
            const possibleLinuxPaths = [
                '/usr/bin/google-chrome',
                '/usr/bin/chromium',
                '/usr/bin/chromium-browser',
                '/snap/bin/chromium'
            ];
            const { existsSync } = await import('fs');
            chromeExecutablePath = possibleLinuxPaths.find(path => existsSync(path));
            
            if (!chromeExecutablePath) {
                throw new Error('Could not find Chrome/Chromium installation. Please set CHROME_EXECUTABLE_PATH environment variable.');
            }
        }
    }

    console.log(`Using local Chrome executable: ${chromeExecutablePath}`);

    return puppeteer.launch({
        headless: true,
        executablePath: chromeExecutablePath,
        defaultViewport: { width: 1920, height: 1080 },
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-features=site-per-process',
            '--shm-size=3gb',
            '--window-size=1920,1080'
        ]
    });
}