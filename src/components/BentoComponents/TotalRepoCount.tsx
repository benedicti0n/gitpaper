import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideFolderGit } from 'lucide-react'
import React from 'react'

const TotalRepoCount = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main2}` }}>
            <h1 className="w-full flex text-sm font-[ChivoThin] items-center"><LucideFolderGit className="h-4 w-4 mr-1" />Repos</h1>
            <h1 className="text-xl pt-2 font-[ChivoMedium]">
                {githubData.userDetails.totalRepositories}
            </h1>
        </div>
    )
}

export default TotalRepoCount