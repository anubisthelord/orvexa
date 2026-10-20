"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollProgress, [0, 0.2], [0, -50]);

  return (
    <motion.div 
      style={{ opacity, y }}
      // Removed backdrop-blur and overflow-hidden from the main wrapper
      className="relative w-fit h-fit flex flex-col items-center justify-center text-center md:px-12"
    >
      
      {/* 
        THE FIX: Soft Radial Background Haze 
        This creates a circular, soft dark fade behind the text instead of a boxy blur.
      */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
          filter: 'blur(30px)', // Blurs the gradient itself for a smooth transition
          transform: 'scale(1.2)', // Pushes the edges further out so no hard lines appear
        }}
      />

      {/* Top Subtitle */}
      <div className="relative z-10 mb-2 flex items-center gap-4 px-4 border-b border-dashed text-[#55FF55] font-mono text-sm font-bold backdrop-blur-sm rounded-full uppercase opacity-90">
        Advanced Deep Space Systems
      </div>

      {/* Main Headings with 3D Black Outer Edge Effect */}
      <h1 
        className="relative z-10 text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05] mb-5"
        style={{
          textShadow: `
            -1px -1px 0px rgba(255,255,255,0.8), 
            2px 2px 0px #000, 
            4px 4px 6px rgba(0,0,0,0.9)
          `
        }}
      >
        Explore. Navigate.<br />
        Reach the <span className="text-[#55ff55] relative inline-block" style={{
          textShadow: `
            -1px -1px 0px rgba(255,255,255,0.8), 
            2px 2px 0px #000, 
            4px 4px 6px rgba(0,0,0,0.9)
          `
        }}>
          Horizon.
          {/* Green Underline */}
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </h1>

      {/* Subdescription */}
      <p className="relative z-10 max-w-xl text-gray-300 text-sm md:text-lg leading-snug mb-10 font-sans drop-shadow-md">
        Six integrated orbital technologies working in unison to chart unknown sectors, 
        monitor stellar phenomena, power deep space telemetry, and secure your mission.
      </p>

      {/* Call to Action Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
        {/* Primary Button */}
        <button className="group relative px-8 py-3.5 bg-[#55ff55] text-black font-mono text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-[#44dd44] transition-all duration-300 overflow-hidden pointer-events-auto">
          <span className="relative z-10 flex items-center gap-2">
            Launch Mission
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </button>

        {/* Secondary Button */}
        <button className="px-8 py-3.5 bg-transparent border border-gray-400/30 text-white font-mono text-[11px] tracking-widest uppercase rounded-full hover:bg-white/10 hover:border-gray-300 transition-all duration-300 pointer-events-auto">
          Contact Mission Control
        </button>
      </div>

    </motion.div>
  );
}