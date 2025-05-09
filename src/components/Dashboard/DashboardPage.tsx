import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Section from './Section';

interface IWallpapers {
    extension: [{
        wallpaperId: string,
        githubUsername: string,
        bentoLink: string,
        backgroundImageLink: string,
    }];
    mobile: [{
        wallpaperId: string,
        githubUsername: string,
        bentoLink: string,
        backgroundImageLink: string,
    }];
    desktop: [{
        wallpaperId: string,
        githubUsername: string,
        bentoLink: string,
        backgroundImageLink: string,
    }];
}

const DashboardPage = () => {
    const { user } = useUser()
    const userId = user?.id

    const [wallpapers, setUserWallpapers] = useState<IWallpapers>()

    const fetchPreviewWallpapers = async () => {
        try {
            const response = await axios.post("/api/v1/wallpaper/fetchPreviewWallpapers",
                { userId },
                {
                    headers: { "Content-Type": "application/json", },
                });

            const data = await response.data;
            console.log(data);

            if (data.success) {
                setUserWallpapers(data.wallpapers)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPreviewWallpapers()
    }, [])
    return (
        <div className='h-screen w-full flex items-center justify-center pt-24'>
            <div className='h-full w-4/5'>
                <h1 className='text-4xl font-ChivoMedium pb-4'>Create Wallpaper</h1>
                <div className='w-full grid grid-cols-2'>
                    <div className="mt-6  col-span-2">
                        <Section heading="Extension" wallpapers={wallpapers?.extension} />
                    </div>
                    {/* <div className="mt-10">
                        <Section heading="Desktop" wallpapers={wallpapers?.desktop} />
                    </div>
                    <div className="flex w-full mt-10">
                        <Section heading="Mobile" wallpapers={wallpapers?.mobile} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage