import React from 'react'
import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideMapPinHouse } from 'lucide-react'

const Location = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()

    return (
        <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${currentPalette.main2}` }}>
            <h1 className="w-full flex text-sm font-[ChivoThin] items-center "><LucideMapPinHouse className="h-4 w-4 mr-1" />Location</h1>
            <h1 className="text-sm pt-2 font-[ChivoMedium] ">
                {githubData.userDetails.location}
            </h1>
        </div>
    )
}

export default Location