"use client"
import { useRef } from 'react';
import ControlLayout from './ControlLayout';
import Bento from './Bento';
import { DotPattern } from '@/components/magicui/dot-pattern';

const BentoLayout = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center'>
            <DotPattern height={40} width={40} />
            <ControlLayout bentoComponentRef={componentRef} />
            <Bento bentoComponentRef={componentRef} />
        </div>
    );
};

export default BentoLayout;
