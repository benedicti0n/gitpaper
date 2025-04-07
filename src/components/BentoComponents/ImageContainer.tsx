import React from 'react'
import { useColorPaletteStore, useImageUploadStore } from '@/store';


interface ImageContainerProps {
    position: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ position }) => {
    const { data } = useImageUploadStore();
    const { currentPalette } = useColorPaletteStore();

    const imageData = data.find((item) => item.position === position);

    return (
        <div className="h-full w-full rounded-xl overflow-hidden">
            {imageData && imageData.imgUrl ? (
                //eslint-disable-next-line
                <img
                    src={imageData.imgUrl.startsWith('data:') ?
                        imageData.imgUrl :
                        `https://api.allorigins.win/raw?url=${encodeURIComponent(imageData.imgUrl)}`
                    }
                    alt={`${position} image`}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                />
            ) : (
                <div
                    className="h-full flex text-center items-center justify-center rounded-xl border-2 border-dashed"
                    style={{
                        backgroundColor: `${currentPalette.main1}`,
                        borderColor: `${currentPalette.main4}`
                    }}
                >
                    <span className="w-full text-sm font-[ChivoRegular]">{position}</span>
                </div>
            )}
        </div>
    );
};


export default ImageContainer