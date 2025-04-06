import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useColorPaletteStore } from '@/store'

const ColorPalleteControl = () => {
    const [theme, setTheme] = useState<string>("Cool Blue");
    const { setCurrentPalette } = useColorPaletteStore()

    const handleThemeChange = (value: string) => {
        setTheme(value);
        setCurrentPalette(value);
    };

    return (
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
    )
}

export default ColorPalleteControl