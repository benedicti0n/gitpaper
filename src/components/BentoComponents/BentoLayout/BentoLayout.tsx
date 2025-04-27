"use client"
import { useColorPaletteStore, useImageUploadStore } from '@/store';
import React, { useEffect, useRef } from 'react';
import ImageContainer from '../ImageContainer';
import Heatmap from '../Heatmap';
import GithubAvatar from '../GithubAvatar';
import PersonalInfo from '../PersonalInfo';
import Location from '../Location';
import TotalRepoCount from '../TotalRepoCount';
import FollowerCount from '../FollowerCount';
import CurrentStreak from '../CurrentStreak';
import LongestStreak from '../LongestStreak';
import TotalCommits from '../TotalCommits';
import TotalPRs from '../TotalPRs';
import TotalStars from '../TotalStars';
import Commits from '../Commits';
import TotalContributionAndOrgs from '../TotalContributionAndOrgs';
import ControlLayout from './ControlLayout';

const BentoLayout = () => {
    const { currentPalette } = useColorPaletteStore();
    const { data } = useImageUploadStore();
    const componentRef = useRef<HTMLDivElement>(null);

    const backgroundImageEntry = data.find(entry => entry.position === "Background");

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center'>
            <ControlLayout bentoComponentRef={componentRef} />
            <div
                className='min-h-screen w-full flex items-center justify-center'
                style={{
                    backgroundImage: backgroundImageEntry?.imgUrl
                        ? `url(${backgroundImageEntry.imgUrl.startsWith('data:')
                            ? backgroundImageEntry.imgUrl
                            : `https://api.allorigins.win/raw?url=${encodeURIComponent(backgroundImageEntry.imgUrl)}`
                        })`
                        : '',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: backgroundImageEntry?.imgUrl ? "none" : `2px dashed ${currentPalette.main4}`,
                    borderRadius: backgroundImageEntry?.imgUrl ? "0px" : "20px"
                }}
            >
                <div
                    ref={componentRef}
                    className="h-164 w-264 p-2 rounded-3xl"
                    style={{
                        background: `linear-gradient(to bottom right, ${currentPalette.main4}, ${currentPalette.main2}, ${currentPalette.main4})`,
                        boxShadow: backgroundImageEntry?.imgUrl ? '' : `0px 10px 20px -3px ${currentPalette.main3}`,
                        color: `${currentPalette.textColor}`,
                    }}
                >
                    <div className="h-full w-full rounded-2xl flex flex-col p-2"
                        style={{ background: `${currentPalette.bgColor}` }}>
                        {/* upperhalf section */}
                        <div className='flex w-full h-7/10'>
                            <div className='h-full w-8/10'>
                                <div className='flex h-1/2 w-full'>
                                    <div className='flex flex-col w-2/12'>
                                        <GithubAvatar />
                                        <ImageContainer position='Top Left' />
                                    </div>
                                    <div className='ml-2 w-4/12'>
                                        <PersonalInfo />
                                    </div>
                                    <div className='grid grid-cols-2 ml-2 gap-2 w-4/12'>
                                        <Location />
                                        <TotalRepoCount />
                                        <FollowerCount />
                                        <ImageContainer position='Top Right' />
                                    </div>
                                    <div className='w-2/12'>
                                        <CurrentStreak />
                                    </div>
                                </div>
                                <div className='flex w-full h-1/2 py-2'>
                                    <div className='w-2/10 h-full'>
                                        <LongestStreak />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 mr-2 w-4/10'>
                                        <Commits />
                                        <TotalPRs />
                                        <TotalStars />
                                        <TotalCommits />
                                    </div>
                                    <div className='w-4/10'>
                                        <TotalContributionAndOrgs />
                                    </div>
                                </div>
                            </div>
                            <div className='w-2/10 ml-2 mb-2'>
                                <ImageContainer position='Right Side' />
                            </div>
                        </div>

                        {/* heatmap section */}
                        <div className='flex w-full h-3/10'>
                            <div className='mr-2 w-full'>
                                <ImageContainer position='Bottom Left' />
                            </div>
                            <Heatmap />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BentoLayout;
