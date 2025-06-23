"use client"

import React from "react";
import { GlowEffect } from "../ui/glow-effect";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DownloadExtention() {
  return (
    <div className="flex justify-center items-center absolute bottom-6 right-6">
      <GlowEffect />
      <div className="relative z-20">
        <Tooltip >
          <TooltipTrigger>
            {/* eslint-disable-next-line */}
            <img src="/chrome.png" alt="chrome" className="h-8 w-8 hover:rotate-180 transition-all duration-300 ease-in-out cursor-pointer" onClick={() => window.open('https://chromewebstore.google.com/detail/gitpaper/ombgjjabgemijgfnennfhgogaconilbg', '_blank')} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Download the Extension</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
