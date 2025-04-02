import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { features } from "./bento-items";
import { TextAnimate } from "./magicui/text-animate";

export default function DownloadSection() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col mx-auto px-12 py-12">
      <TextAnimate
        className="text-4xl md:text-5xl italic tracking-tighter font-bold mb-8 mt-20"
        animation="blurInUp"
        by="character"
        once
      >
        Download Gitpaper Apps
      </TextAnimate>

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
