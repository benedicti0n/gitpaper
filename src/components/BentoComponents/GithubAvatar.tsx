import { useGithubDataStore } from '@/store'
import React from 'react'

const GithubAvatar = () => {
    const { githubData } = useGithubDataStore()
    return (
        <div className="w-1/6 mr-2 flex flex-col items-center">
            {/* eslint-disable-next-line */}
            <img src={`${githubData.userDetails.avatarUrl}`} alt="" className="w-full rounded-2xl mb-2" crossOrigin="anonymous" />
        </div>
    )
}

export default GithubAvatar