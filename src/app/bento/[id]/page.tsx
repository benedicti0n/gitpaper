'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGithubDataStore, useColorPaletteStore, useImageUploadStore, ImageEntry } from '@/store';
import { toPng } from 'html-to-image';
import Bento from '@/components/BentoComponents/BentoLayout/Bento';
import axios from 'axios';

const Page = () => {
    const { setGithubData } = useGithubDataStore();
    const { setData } = useImageUploadStore();
    const { setCurrentPalette } = useColorPaletteStore();
    const [isRendering, setIsRendering] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const githubUsername = searchParams.get('githubUsername');
    const theme = searchParams.get('theme');
    const bentoMiniImagesParam = searchParams.get('bentoMiniImages');
    const imageName = searchParams.get('imageName');
    const [hasComponentRef, setHasComponentRef] = useState(false);

    // Set up theme and images when component mounts
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

        // Mark component as mounted after initial render
        setIsMounted(true);
    }, [theme, bentoMiniImagesParam, setCurrentPalette, setData]);

    const captureAndSendBento = async () => {
        if (!componentRef.current) {
            console.error('Component ref is not available');
            return false;
        }

        try {
            console.log('Starting image capture...');

            const dataUrl = await toPng(componentRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 1,
            });

            console.log('Image captured, converting to blob...');
            const blob = await (await fetch(dataUrl)).blob();

            const formData = new FormData();
            formData.append('bentoImage', blob);
            formData.append('bentoImageName', imageName as string);

            console.log('Sending to server...');
            const result = await axios.post('/api/v1/wallpaper/saveBentoInServer', formData);

            if (result.status !== 200) {
                throw new Error('Failed to save Bento');
            }

            console.log('Bento saved successfully');
            return true;
        } catch (error) {
            console.error('Error in captureAndSendBento:', error);
            throw error;
        }
    };

    // Fetch GitHub data and capture Bento after component is mounted
    useEffect(() => {
        if (!isMounted || !githubUsername) return;

        const fetchData = async () => {
            try {
                console.log('Fetching GitHub data...');
                const response = await axios.post(`/api/v1/github/fetchGithubStats`, {
                    username: githubUsername,
                });
                setGithubData(response.data);

                // Small delay to ensure the Bento component has updated with the new data

                console.log('Attempting to capture Bento...');
                setIsRendering(false);
                setHasComponentRef(true);
            } catch (error) {
                console.error('Error in fetchDataAndCapture:', error);
                setIsRendering(false);
            }
        };

        fetchData();
    }, [githubUsername, isMounted, setGithubData]);

    useEffect(() => {
        setTimeout(() => {
            captureAndSendBento();
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasComponentRef]);

    if (!githubUsername || !imageName) {
        return <div>Missing required parameters</div>;
    }

    if (isRendering) {
        return <div>Loading Bento data and capturing image...</div>;
    }

    return <Bento bentoComponentRef={componentRef} />;
};

export default Page;