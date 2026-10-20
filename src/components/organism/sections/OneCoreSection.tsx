"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OneCoreSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function OneCoreSection({ scrollProgress }: OneCoreSectionProps) {
// Inside OneCoreSection.tsx
// Fades IN: 0.42 -> 0.48
// Fades OUT: 0.53 -> 0.56 (Gone before Services starts)
const opacity = useTransform(scrollProgress, [0.42, 0.48, 0.53, 0.56], [0, 1, 1, 0]);
const x = useTransform(scrollProgress, [0.42, 0.48, 0.53, 0.56], [-50, 0, 0, -50]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center"
    >
      {/* 
        CONTENT WRAPPER 
        Occupies the left half of the screen, with left padding to align with the menu.
      */}
      <div className="w-full md:w-1/2 pl-[12%] md:pl-[15%] lg:pl-[18%] flex flex-col items-start pr-8">
        
        {/* Top Subtitle */}
        <div className="flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] mb-6">
          <span className="w-8 h-[1px] bg-green-500/50" />
          One ecosystem, not six contracts
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
          Every layer of defence,<br />
          <span className="text-[#55ff55] font-bold drop-shadow-[0_0_15px_rgba(85,255,85,0.3)]">
            pulled into one core.
          </span>
        </h1>

        {/* Paragraph Description */}
        <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg font-sans">
          Discover, test, protect, detect, respond — one integrated, 
          sovereign European security lifecycle. Not six vendors that 
          never talk to each other.
        </p>

      </div>
    </motion.div>
  );
}