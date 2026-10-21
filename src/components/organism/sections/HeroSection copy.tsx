"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Button from "@/components/shared/atoms/Button";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  // Fade out at the end
  const opacity = useTransform(scrollProgress, [0, 0.10, 0.125], [1, 1, 0]);
  
  // FIX: Use "-100vh" string instead of window.innerHeight.
  // Framer Motion handles string interpolation (vh) perfectly on the GPU.
  const y = useTransform(scrollProgress, [0, 0.125], ["0vh", "-120vh"]);

  return (
    <motion.div 
      style={{ 
        opacity, 
        y,
        willChange: "transform, opacity" // Forces GPU layer
      }}
      className="relative w-fit h-fit flex flex-col items-center justify-center text-center md:px-12"
    >
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
          filter: 'blur(30px)',
          transform: 'scale(1.2)',
        }}
      />

      <div className="relative z-10 mb-2 flex items-center gap-4 px-4 border-b border-dashed text-[#55FF55] font-mono text-sm font-bold backdrop-blur-sm rounded-full uppercase opacity-90">
        Advanced Deep Space Systems
      </div>

      <h1 
        className="relative z-10 text-5xl md:!text-7xl font-sans tracking-tight !font-normal text-white leading-[1.05] mb-5"
        style={{
          textShadow: `-1px -1px 0px rgba(255,255,255,0.8), 2px 2px 0px #000, 4px 4px 6px rgba(0,0,0,0.9)`
        }}
      >
        Discover. Protect.<br />
        Stay <span className="text-[#55ff55] relative inline-block" style={{
          textShadow: `-1px -1px 0px rgba(255,255,255,0.8), 2px 2px 0px #000, 4px 4px 6px rgba(0,0,0,0.9)`
        }}>
          Resilient.
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </h1>

      <p className="relative z-10 max-w-3xl text-gray-300 text-sm md:text-lg !leading-snug mb-10 drop-shadow-md">
        Six integrated services that work together to protect your attack surface, 
        detect threats, monitor the dark web, empower your team, and keep you compliant.
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
        <Button variant="primary" size="md">Explore Services ↗</Button>
        <Button variant="secondary" size="md" className="backdrop-blur-sm">Talk to Our Team</Button>
      </div>
    </motion.div>
  );
}