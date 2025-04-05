import { useColorPaletteStore, useGithubDataStore } from '@/store'
import React from 'react'

const PersonalInfo = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main1}` }}>
            <h1 className="text-2xl font-[ChivoMedium]">{githubData.userDetails.name} <span className="text-sm font-[ChivoRegular]">{ }</span></h1>
            <h1 className="text-lg font-[ChivoRegular]">@{githubData.userDetails.username}</h1>
            <h1 className="h-1/2 text-xs font-[ChivoRegular] mt-4">{githubData.userDetails.bio}</h1>
        </div>
    )
}

export default PersonalInfo