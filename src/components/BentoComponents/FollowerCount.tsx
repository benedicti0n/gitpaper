import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideUser } from 'lucide-react'
import React from 'react'

const FollowerCount = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()

    return (
        <div className="h-full rounded-xl p-4 flex flex-col" style={{ backgroundColor: `${currentPalette.main2}` }}>
            <h1 className="w-full flex text-sm font-[ChivoThin] items-center"> <LucideUser className="h-4 w-4 mr-1" />Followers</h1>
            <h1 className="text-xl pt-2 font-[ChivoMedium]">
                {githubData?.userDetails.followersCount}
            </h1>
        </div>
    )
}

export default FollowerCount