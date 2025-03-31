"use client"

import React, { useState } from 'react'
import { LineShadowText } from '../magicui/line-shadow-text'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'

import { LucideSearch } from "lucide-react"

const Homepage = () => {
    const [username, setUsername] = useState<string>("");
    const handleSearch = async () => {
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
        <div className="w-full h-auto flex flex-col items-center relative">
            <div className="w-full h-full flex flex-col items-center mt-56 py-16">
                <span className='text-8xl font-extrabold italic'>
                    Git
                    <LineShadowText shadowColor='black'>
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