import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideGitPullRequest } from 'lucide-react'
import React from 'react'

const TotalPRs = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()
    return (
        <div className="rounded-xl p-4" style={{ backgroundColor: `${currentPalette.main2}` }}>
            <h1 className="w-full flex text-sm font-[ChivoThin]"> <LucideGitPullRequest className="h-6 w-6 mr-1" />PRs</h1>
            <h1 className="text-lg pt-2 font-[ChivoMedium]">{githubData.userDetails.pullRequestsCount}</h1>
        </div>
    )
}

export default TotalPRs