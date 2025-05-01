import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideStar } from 'lucide-react'
import React from 'react'

const TotalStars = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main2}` }}>
            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideStar className="h-6 w-6 mr-1" />Total Stars</h1>
            <h1 className="text-lg pt-2 font-[ChivoMedium]">{githubData?.userDetails.totalStars}</h1>
        </div>
    )
}

export default TotalStars