import { useGithubDataStore } from '@/store'
import React from 'react'

const GithubAvatar = () => {
    const { githubData } = useGithubDataStore()
    return (
        <div>
            {/* eslint-disable-next-line */}
            <img src={`https://api.allorigins.win/raw?url=${encodeURIComponent(githubData!.userDetails.avatarUrl)}`} alt={`${githubData!.userDetails.avatarUrl}`} className="rounded-2xl mb-2" crossOrigin="anonymous" />
        </div>
    )
}

export default GithubAvatar