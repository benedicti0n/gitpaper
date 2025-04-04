import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { features } from "./bento-items";
import { LineShadowText } from "../magicui/line-shadow-text";

export default function DownloadSection() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col mx-auto px-12 py-12">
      <span className='text-4xl md:text-5xl italic tracking-tighter font-bold mb-8 mt-20'>
        Download
        <LineShadowText shadowColor='black' className='italic'>
          Gitpaper
        </LineShadowText>
        Apps
      </span>

      <div className="max-w-4xl">
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoCard key={index} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
