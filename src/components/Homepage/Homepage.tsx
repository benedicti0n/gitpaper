"use client"

import React, { useState } from 'react'
import { LineShadowText } from '../magicui/line-shadow-text'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'

import { LucideSearch } from "lucide-react"
import { useGithubData } from '@/app/hooks/useGithubData'

const Homepage = () => {
    const [username, setUsername] = useState<string>("");
    const { githubData, fetchGithubData } = useGithubData()

    const handleSearch = async () => {
        await fetchGithubData(username)
        console.log(githubData);

        // setIsLoading(true);
        // await fetchGithubData(username);
        // removeGithubDataFromLocalStorage();
        // setIsLoading(false);
        // window.location.reload()
        console.log("working");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    };

    return (
        <div className="w-2/3 mx-auto border min-h-screen flex flex-col items-center relative">
            <div className="w-full h-full flex flex-col items-center mt-56 py-16">
                <span className='text-8xl font-extrabold'>
                    Git
                    <LineShadowText shadowColor='black' className='italic'>
                        Paper
                    </LineShadowText>
                </span>
                {/* <p className="text-xl font-semibold mt-2">Generate yours now 👇🏼</p> */}
                <div className="mt-8 gap-2 flex">
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
            </div>
        </div >
    )
}

export default Homepage