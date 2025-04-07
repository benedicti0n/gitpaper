import React from 'react'
import ColorPalleteControl from '../ColorPalleteControl'
import { useColorPaletteStore } from '@/store';
import { ImageUploadControl } from '@/components/ImageUploadControl';

const ControlLayout = () => {
    const { currentPalette } = useColorPaletteStore();
    return (
        <div className='flex items-center justify-center p-2 rounded-3xl mt-6 w-264 mb-10 ' style={{
            background: `linear-gradient(to bottom right, ${currentPalette.main4}, ${currentPalette.main2}, ${currentPalette.main4})`,
            boxShadow: `0px 10px 20px -3px ${currentPalette.main3}`,
            color: `${currentPalette.textColor}`
        }}>
            <div className="w-full p-6 rounded-2xl bg-gray-100 shadow-lg flex gap-6" style={{ background: `${currentPalette.bgColor}` }}>


                {/* Color Palette Selection */}
                <div className="w-1/2 p-5 rounded-xl font-[ChivoRegular]">
                    <h3 className="text-xl font-[ChivoMedium] font-semibold mb-4 invert">Choose Color Pallete</h3>
                    <ColorPalleteControl />
                </div>

                {/* Image Upload Section */}
                <div className="w-1/2 p-5 rounded-xl shadow-md font-[ChivoRegular]" style={{ background: `${currentPalette.main1}`, color: `${currentPalette.textColor}` }}>
                    <h3 className="text-xl font-[ChivoMedium] font-semibold mb-4">Upload Images</h3>
                    <ImageUploadControl />
                </div>
            </div>
        </div>
    )
}

export default ControlLayout