import { useColorPaletteStore, useGithubDataStore } from '@/store'
import React from 'react'
import GithubGraph from '../ui/GithubGraph'

const Heatmap = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="h-full px-6 py-3 rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${currentPalette.main4}` }}>
            <GithubGraph username={githubData.userDetails.username} blockMargin={4} colorPallete={[currentPalette.githubHeatmap[0], currentPalette.githubHeatmap[1], currentPalette.githubHeatmap[2], currentPalette.githubHeatmap[3], currentPalette.githubHeatmap[4]]}
                scrollbarColor1={`${currentPalette.main2}`} scrollbarColor2={`${currentPalette.main4}`} />
        </div>
    )
}

export default Heatmap