import { forwardRef, ReactNode } from "react";
import { GlowEffect } from "./glow-effect";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  onClickFunction?: () => void; // Changed to proper function type
  children?: ReactNode;
  className?: string; // Added to allow custom styling
  variant?: "default" | "destructive" | "success";
  disabled?: boolean; // Added to allow disabling the button
}
interface IVariants {
  default: {
    bg: string;
    text: string;
  };
  destructive: {
    bg: string;
    text: string;
  };
  success: {
    bg: string;
    text: string;
  };
}

const variants: IVariants = {
  default: {
    bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg ",
    text: "text-black-600 gap-1",
  },
  destructive: {
    bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg",
    text: "group-hover:text-red-500 text-red-600 gap-1",
  },
  success: {
    bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg",
    text: "group-hover:text-green-500 text-green-600 gap-1",
  },
};

const MiniButton = forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      text,
      icon,
      onClickFunction,
      children,
      // eslint-disable-next-line
      disabled = false,
      className = "",
      variant = "default",
    },
    ref
  ) => {
    return (
      <div
        ref={ref} // <- ⭐ VERY IMPORTANT
        className={`${variants[variant].bg} ${className}`}
        onClick={onClickFunction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClickFunction?.();
          }
        }}
      >
        <GlowEffect mode="colorShift" blur="soft" duration={3} scale={0.8} />
        <div className="p-1 backdrop-blur-xl bg-background rounded-md w-full h-full border">
          <div
            className={`group-hover:scale-100 flex items-center justify-center ${variants[variant].text}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {children}
                  {icon}
                </TooltipTrigger>
                <TooltipContent>{text}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    );
  }
);

MiniButton.displayName = "MiniButton"; // <- necessary because we used forwardRef!

export default MiniButton;
