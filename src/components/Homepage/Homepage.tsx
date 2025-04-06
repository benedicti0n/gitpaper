"use client"

import React, { useEffect, useState } from 'react'
import { LineShadowText } from '../magicui/line-shadow-text'
import { Input } from '../ui/Input'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { LucideSearch } from "lucide-react"
import { useGithubData } from '@/app/hooks/useGithubData'
import { useColorPaletteStore } from '@/store'
import { useGithubDataStore } from '@/store'
import ImageContainer from '../BentoComponents/ImageContainer'
import { ImageUpload } from '../ImageUpload'

const Homepage = () => {
    const [username, setUsername] = useState<string>("");
    const [theme, setTheme] = useState<string>("Cool Blue");
    const { fetchGithubData } = useGithubData()
    const { setCurrentPalette, currentPalette } = useColorPaletteStore()
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

    useEffect(() => {
        console.log(currentPalette);
    }, [currentPalette])

    const handleThemeChange = (value: string) => {
        setTheme(value);
        setCurrentPalette(value);
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
                <div className="mt-4 w-[200px]">
                    <Select value={theme} onValueChange={handleThemeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cool Blue">Cool Blue</SelectItem>
                            <SelectItem value="Warm Sunset">Warm Sunset</SelectItem>
                            <SelectItem value="Forest Green">Forest Green</SelectItem>
                            <SelectItem value="Vivid Purple">Vivid Purple</SelectItem>
                            <SelectItem value="Earth Tone">Earth Tone</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <ImageUpload />

                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <div className="h-[200px]">
                        <ImageContainer position="Top Left" />
                    </div>
                    <div className="h-[200px]">
                        <ImageContainer position="Top Right" />
                    </div>
                    <div className="h-[200px]">
                        <ImageContainer position="Bottom Left" />
                    </div>
                    <div className="h-[200px]">
                        <ImageContainer position="Right Side" />
                    </div>
                </div>
                <div className="w-full h-[300px] mt-4">
                    <ImageContainer position="Background" />
                </div>

            </div>
        </div>
    )
}

export default Homepage