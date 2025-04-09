import { useGithubData } from '@/hooks/useGithubData';
import { useGithubDataStore } from '@/store';
import React, { useState } from 'react'
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import { LucideSearch } from 'lucide-react';
import BentoLayout from '../BentoComponents/BentoLayout/BentoLayout';

const CreateWallpaperPage = () => {
    const [username, setUsername] = useState<string>("");
    const { fetchGithubData } = useGithubData()
    const { githubData } = useGithubDataStore()

    const handleSearch = async () => {
        await fetchGithubData(username)
        console.log("working");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center relative">
            <div className="w-full h-full flex flex-col justify-center items-center py-16">
                {
                    !githubData &&
                    <div className="mt-4 gap-1 flex">
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter GitHub username"
                            className='bg-white'
                        />
                        <Button onClick={() => handleSearch()}>
                            <LucideSearch />
                            Search
                        </Button>
                    </div>
                }

                {githubData &&
                    <BentoLayout />
                }
            </div>
        </div >
    )
}

export default CreateWallpaperPage