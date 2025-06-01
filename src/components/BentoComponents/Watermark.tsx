import React from 'react'
import { useColorPaletteStore } from '@/store';

const Watermark = () => {
    const { currentPalette } = useColorPaletteStore();

    return (
        <div
            className='bg-red-400 rounded-xl p-1'
            style={{
                background: `linear-gradient(to bottom right, ${currentPalette.main4}, ${currentPalette.main2}, ${currentPalette.main4})`,
                boxShadow: `0px 10px 20px -3px ${currentPalette.main3}`,
                color: `${currentPalette.textColor}`,
            }}
        >
            <div className='bg-white text-black font-[ChivoMedium] rounded-lg px-4 py-1 text-xs flex justify-center items-center'>
                Made With
                {/* eslint-disable-next-line */}
                <img src="/logo.png" alt="logo" className='h-6 w-6' />
                Gitpaper.com
            </div>
        </div>
    )
}

export default Watermark