import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useColorPaletteStore } from '@/store'

const ColorPalleteControl = () => {
    const { currentPalette, setCurrentPalette } = useColorPaletteStore()
    const [theme, setTheme] = useState<string>(currentPalette.name) // Initialize from store

    // Sync on mount in case persisted store loads after initial render
    useEffect(() => {
        setTheme(currentPalette.name)
    }, [currentPalette.name])

    const handleThemeChange = (value: string) => {
        setTheme(value)
        setCurrentPalette(value)
    }

    return (
        <div className="mt-4 w-full text-black">
            <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Cool Blue">Cool Blue</SelectItem>
                    <SelectItem value="Warm Sunset">Warm Sunset</SelectItem>
                    <SelectItem value="Forest Green">Forest Green</SelectItem>
                    <SelectItem value="Ellie's Purple">{`Ellie's Purple`}</SelectItem>
                    <SelectItem value="Earth Tone">Earth Tone</SelectItem>
                    <SelectItem value="Monochrome">Monochrome</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default ColorPalleteControl
