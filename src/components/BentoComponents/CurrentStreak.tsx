import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideFlame } from 'lucide-react'
import React from 'react'

const CurrentStreak = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main3}` }}>
            <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
            <h1 className="w-full mt-4 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideFlame className="h-12 w-12 mb-2" />{githubData?.streakStats.currentStreak}</h1>
        </div>
    )
}

export default CurrentStreak