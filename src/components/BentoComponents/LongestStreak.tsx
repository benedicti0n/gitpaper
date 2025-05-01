import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideCalendar } from 'lucide-react'
import React from 'react'

const LongestStreak = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="mr-2 h-full rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main3}` }}>
            <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
            <h1 className="w-full mt-8 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideCalendar className="h-12 w-12 mb-2" />{githubData?.streakStats.longestStreak}</h1>
        </div>
    )
}

export default LongestStreak