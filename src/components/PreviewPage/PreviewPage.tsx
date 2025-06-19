"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Check, Link } from 'lucide-react'
import { GlowEffect } from '../ui/glow-effect'
import MiniButton from '../ui/MiniButton'

type IWallpaper = {
    bentoLink: string;
    backgroundImageLink: string;
}

const PreviewPage = () => {
    const [isCopied, setIsCopied] = useState(false)
    const [wallpaper, setWallpaper] = useState<IWallpaper>()
    const { wallpaperId } = useParams()

    const fetchPreviewWallpaper = async () => {
        const response = await axios.post("/api/v1/wallpaper/fetchPreviewPage",
            { wallpaperId },
            { headers: { "Content-Type": "application/json" } }
        )

        const { bentoAndBgWallpaperLink } = response.data
        setWallpaper(bentoAndBgWallpaperLink)
    }

    useEffect(() => {
        fetchPreviewWallpaper()
        // eslint-disable-next-line
    }, [])

    if (!wallpaper) {
        return <div>Loading...</div>
    }

    return (
        <div
            className='h-screen w-full flex items-center justify-center'
            style={{
                backgroundImage: `url(${wallpaper.backgroundImageLink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* eslint-disable-next-line */}
            <img src={`${wallpaper.bentoLink}`} alt={`${wallpaper.bentoLink}`} className='w-[60%]' />

            <div className='absolute bottom-4 right-4'>
                <GlowEffect />
                <div className='gap-2 flex items-center justify-center bg-white relative z-20 p-1 rounded-lg'>
                    <MiniButton
                        text={isCopied ? "Copied to Clipboard!" : "Copy Link."}
                        variant='default'
                        onClickFunction={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setIsCopied(!isCopied)
                        }}>
                        {isCopied ? <Check className='h-6 w-6 text-green-500' /> : <Link className='h-6 w-6' />}
                    </MiniButton>
                    <Button onClick={() => window.open('https://gitpaper.vercel.app', '_blank')}>
                        Create your Own
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PreviewPage