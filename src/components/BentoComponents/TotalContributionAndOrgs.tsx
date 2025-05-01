import { useColorPaletteStore, useGithubDataStore } from '@/store'
import { LucideEllipsis, LucideGitBranch } from 'lucide-react'
import React from 'react'

const TotalContributionAndOrgs = () => {
    const { currentPalette } = useColorPaletteStore()
    const { githubData } = useGithubDataStore()

    return (
        <div className="w-full h-full flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${currentPalette.main1}` }}>
            <h1 className="w-full flex font-[ChivoThin] text-base"><LucideGitBranch className="h-6 w-6 mr-1" />Total Contribution and Orgs</h1>
            <div className="h-full flex mt-4">
                <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                    {githubData?.userDetails.contributedReposCount}
                </h1>
                <div className="w-3/4 flex flex-col">
                    {githubData?.userDetails.contributedOrganizations && githubData?.userDetails.contributedOrganizations.map((org: { name: string, avatarUrl: string }) => (
                        <div key={org.name} className="flex mb-4">
                            {/* eslint-disable-next-line */}
                            <img src={`${org.avatarUrl}`} alt={org.name} className="w-6 h-6 mr-2 rounded-full" crossOrigin="anonymous" />
                            <span className="font-[ChivoRegular] text-sm">{org.name}</span>
                        </div>
                    ))}
                    <LucideEllipsis className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

export default TotalContributionAndOrgs