'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGithubDataStore, useColorPaletteStore, useImageUploadStore, ImageEntry } from '@/store';
import { toPng } from 'html-to-image';
import Bento from '@/components/BentoComponents/BentoLayout/Bento';

const Page = () => {
    const { setGithubData } = useGithubDataStore();
    const { setData } = useImageUploadStore();
    const { setCurrentPalette } = useColorPaletteStore();
    const [isRendering, setIsRendering] = useState(true);
    const componentRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    const githubUsername = searchParams.get('githubUsername');
    const theme = searchParams.get('theme');
    const bentoMiniImagesParam = searchParams.get('bentoMiniImages');
    const imageName = searchParams.get('imageName');

    const captureAndSendBento = async () => {
        if (!componentRef.current) return;

        try {
            const dataUrl = await toPng(componentRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
            });
            const blob = await (await fetch(dataUrl)).blob();

            const formData = new FormData();
            formData.append('bentoImage', blob);
            formData.append('bentoImageName', imageName as string);

            // Send to your API endpoint
            const result = await fetch('/api/save-bento', {
                method: 'POST',
                body: formData,
            });

            if (!result.ok) {
                throw new Error('Failed to save Bento');
            }

            console.log('Bento saved successfully');
        } catch (error) {
            console.error('Error capturing Bento:', error);
        } finally {
            setIsRendering(false);
        }
    };

    useEffect(() => {
        if (theme) {
            setCurrentPalette(theme);
        }

        if (bentoMiniImagesParam) {
            try {
                const bentoMiniImages: ImageEntry[] = JSON.parse(bentoMiniImagesParam);
                bentoMiniImages.forEach(({ position, imgUrl }) => {
                    setData(position, imgUrl);
                });
            } catch (error) {
                console.error('Error parsing bentoMiniImages:', error);
            }
        }

        const fetchData = async () => {
            if (githubUsername) {
                try {
                    const response = await fetch(`/api/github?username=${encodeURIComponent(githubUsername)}`);
                    const data = await response.json();
                    setGithubData(data);

                    // Start capture after data is loaded and component is rendered
                    setTimeout(captureAndSendBento, 1000); // Small delay to ensure rendering is complete
                } catch (error) {
                    console.error('Error fetching GitHub data:', error);
                    setIsRendering(false);
                }
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [githubUsername, theme, bentoMiniImagesParam, setCurrentPalette, setData, setGithubData]);

    if (!githubUsername || !imageName) {
        return <div>Missing required parameters</div>;
    }

    if (isRendering) {
        return <div>Rendering Bento...</div>;
    }

    return <Bento bentoComponentRef={componentRef} />;
};

export default Page;