"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type IWallpaper = {
    bentoLink: string;
    backgroundImageLink: string;
}

const PreviewPage = () => {
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
        </div>
    )
}

export default PreviewPage