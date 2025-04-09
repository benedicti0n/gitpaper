'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/ui/tubelight-navbar'
import CreateWallpaperPage from '@/components/CreateWallpaperPage/CreateWallpaperPage'

const CreateWallpaper = () => {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <NavBar />
            <CreateWallpaperPage />
        </div>
    )
}

export default CreateWallpaper
