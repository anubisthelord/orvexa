"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Button from "@/components/shared/atoms/Button";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const opacity = useTransform(scrollProgress, [0, 0.10, 0.125], [1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.125], ["0vh", "-120vh"]);

  return (
    <motion.div 
      style={{ opacity, y, willChange: "transform, opacity" }}
      className="relative w-fit h-fit flex flex-col items-center justify-center text-center md:px-12"
    >
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)',
          filter: 'blur(30px)',
          transform: 'scale(1.2)',
        }}
      />

      <div className="relative z-10 mb-2 flex items-center gap-4 px-4 border-b border-dashed text-[#55FF55] font-mono text-sm font-bold backdrop-blur-sm rounded-full uppercase opacity-90">
        Advanced Deep Space Systems
      </div>

      {/* CLEAN 3D GLASS TEXT EFFECT */}
      <h1 className="relative z-10 text-5xl md:!text-7xl font-sans tracking-tight !font-normal  mb-5 flex flex-col items-center gap-2">
        
        {/* Line 1 */}
        <span
          className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.2)",
            filter: "drop-shadow(0px 4px 0px rgba(255,255,255,0.1)) drop-shadow(0px 10px 20px rgba(0,0,0,0.9)) drop-shadow(0px 0px 40px rgba(255,255,255,0.2))",
          }}
        >
          Discover. Protect.
        </span>

        {/* Line 2 */}
        <span
          className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#d4ffb0] via-[#55ff55] to-[#1a6b1a]"
          style={{
            WebkitTextStroke: "2px rgba(182,255,122,0.3)",
            filter: "drop-shadow(0px 4px 0px rgba(85,255,85,0.1)) drop-shadow(0px 10px 20px rgba(0,0,0,0.9)) drop-shadow(0px 0px 40px rgba(85,255,85,0.4))",
          }}
        >
          Stay Resilient.
        </span>
      </h1>

      <p className="relative z-10 max-w-3xl !text-gray-300 text-sm md:text-lg !leading-snug mb-10 drop-shadow-md">
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