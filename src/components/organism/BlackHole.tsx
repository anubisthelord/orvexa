"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

export type BlackHolePosition = 
  | "center" 
  | "top-right" | "top-left" 
  | "bottom-right" | "bottom-left"
  | "center-right" | "center-left";

export interface BlackHoleSectionConfig {
  section: number; 
  scale?: number;     // Forces a static scale for the section
  minScale?: number;  // The minimum size it can shrink to in this section
  maxScale?: number;  // The maximum size it can grow to in this section
  position?: BlackHolePosition; 
  preserveSize?: boolean; 
  /** Per-section override: hide the starfield while this section is active. */
  showStars?: boolean;
}

interface BlackHoleProps {
  scrollProgress: MotionValue<number>;
  sections?: BlackHoleSectionConfig[];
  /** Global default — set to false to hide stars everywhere. Defaults to true. */
  showStars?: boolean;
}

const POSITION_MAP: Record<BlackHolePosition, { x: string; y: string }> = {
  "center":       { x: "0vw",  y: "0vh" },
  "top-right":    { x: "22vw", y: "-22vh" },
  "top-left":     { x: "-22vw", y: "-22vh" },
  "bottom-right": { x: "22vw", y: "22vh" },
  "bottom-left":  { x: "-22vw", y: "22vh" },
  "center-right": { x: "25vw", y: "0vh" },
  "center-left":  { x: "-25vw", y: "0vh" },
};

export default function BlackHole({ scrollProgress, sections = [], showStars = true }: BlackHoleProps) {
  const [stars, setStars] = useState<
    Array<{ id: number; top: string; left: string; size: number; delay: string; duration: string; color: string; opacity: number }>
  >([]);

  useEffect(() => {
    if (!showStars) {
      setStars([]);
      return;
    }

    const numStars = 600; 
    const generatedStars = Array.from({ length: numStars }).map((_, i) => {
      const randomSize = Math.random();
      let size = 0.5;
      if (randomSize > 0.8) size = Math.random() * 2 + 1.5; 
      else if (randomSize > 0.4) size = Math.random() * 1 + 0.8; 
      else size = Math.random() * 0.5 + 0.3; 

      const colors = ["#ffffff", "#e0f2fe", "#fef08a"];
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: size,
        delay: `${Math.random() * 5}s`, 
        duration: `${Math.random() * 4 + 2}s`, 
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3, 
      };
    });
    setStars(generatedStars);
  }, [showStars]);

  // 1. BASE SCROLL SCALING
  const baseVideoScale = useTransform(scrollProgress, [0, 0.5], [1.25, 0.8125]);
  const baseRingScale = useTransform(scrollProgress, [0, 0.5], [1, 1.25]);

  // 2. DYNAMIC ENGINE
  const totalSections = Math.max(...sections.map(s => s.section), 1) + 1;

  const sortedSections = [...sections].sort((a, b) => a.section - b.section);

  const inputRange: number[] = [0];
  const xOutput: string[] = [POSITION_MAP["center"].x];
  const yOutput: string[] = [POSITION_MAP["center"].y];
  const scaleOverrideOutput: number[] = [1]; 
  const starsOpacityOutput: number[] = [showStars ? 1 : 0];

  sortedSections.forEach((s, index) => {
    const progress = s.section / (totalSections - 1);

    const currentStars = s.showStars !== undefined ? (s.showStars ? 1 : 0) : (showStars ? 1 : 0);
    const prevStars = index > 0 
      ? (sortedSections[index - 1].showStars !== undefined ? (sortedSections[index - 1].showStars ? 1 : 0) : (showStars ? 1 : 0))
      : (showStars ? 1 : 0);

    // Push early fade keyframe
    if (prevStars === 1 && currentStars === 0 && inputRange[inputRange.length - 1] !== progress) {
      const fadeStartProgress = progress - 0.06; 
      if (fadeStartProgress > inputRange[inputRange.length - 1]) {
        inputRange.push(fadeStartProgress);
        xOutput.push(xOutput[xOutput.length - 1]);
        yOutput.push(yOutput[yOutput.length - 1]);
        scaleOverrideOutput.push(scaleOverrideOutput[scaleOverrideOutput.length - 1]);
        starsOpacityOutput.push(1); 
      }
    }

    if (inputRange[inputRange.length - 1] !== progress) {
      const pos = s.position || "center";
      const mappedPos = POSITION_MAP[pos];

      inputRange.push(progress);
      xOutput.push(mappedPos.x);
      yOutput.push(mappedPos.y);
      
      if (s.preserveSize) {
        scaleOverrideOutput.push(1); 
      } else if (s.scale !== undefined) {
        scaleOverrideOutput.push(s.scale);
      } else if (s.minScale !== undefined && s.maxScale !== undefined) {
        scaleOverrideOutput.push(s.maxScale);
      } else if (s.maxScale !== undefined) {
        scaleOverrideOutput.push(s.maxScale);
      } else if (s.minScale !== undefined) {
        scaleOverrideOutput.push(s.minScale);
      } else {
        scaleOverrideOutput.push(1);
      }

      starsOpacityOutput.push(currentStars);
    }
  });

  if (inputRange[inputRange.length - 1] < 1) {
    inputRange.push(1);
    xOutput.push(xOutput[xOutput.length - 1]);
    yOutput.push(yOutput[yOutput.length - 1]);
    scaleOverrideOutput.push(scaleOverrideOutput[scaleOverrideOutput.length - 1]);
    starsOpacityOutput.push(starsOpacityOutput[starsOpacityOutput.length - 1]);
  }

  const dedupInput: number[] = [];
  const dedupX: string[] = [];
  const dedupY: string[] = [];
  const dedupScale: number[] = [];
  const dedupStars: number[] = [];

  for (let i = 0; i < inputRange.length; i++) {
    if (i === 0 || inputRange[i] > dedupInput[dedupInput.length - 1]) {
      dedupInput.push(inputRange[i]);
      dedupX.push(xOutput[i]);
      dedupY.push(yOutput[i]);
      dedupScale.push(scaleOverrideOutput[i]);
      dedupStars.push(starsOpacityOutput[i]);
    } else {
      dedupX[dedupX.length - 1] = xOutput[i];
      dedupY[dedupY.length - 1] = yOutput[i];
      dedupScale[dedupScale.length - 1] = scaleOverrideOutput[i];
      dedupStars[dedupStars.length - 1] = starsOpacityOutput[i];
    }
  }

  const sectionX = useTransform(scrollProgress, dedupInput, dedupX);
  const sectionY = useTransform(scrollProgress, dedupInput, dedupY);
  // WITH THIS:
const rawWrapperScale = useTransform(scrollProgress, dedupInput, dedupScale);
const finalWrapperScale = useSpring(rawWrapperScale, { stiffness: 80, damping: 20 });  
  // 🟢 THE FIX: Spring-smoothed opacity for the stars
  const rawStarsOpacity = useTransform(scrollProgress, dedupInput, dedupStars);
  const starsOpacity = useSpring(rawStarsOpacity, { stiffness: 80, damping: 20 });

  const rings = Array.from({ length: 9 }).map((_, i) => {
    const baseWidth = 20 + i * 10;
    const opacity = 1 - i * 0.05;
    const thickness = 1 + (i * 0.2); 
    return { baseWidth, opacity, thickness };
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#050505] z-0">
      
      {/* STARFIELD */}
      {showStars && stars.length > 0 && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{ opacity: starsOpacity }}
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                "--twinkle-delay": star.delay,
                "--twinkle-duration": star.duration,
                animationDelay: `var(--twinkle-delay)`,
                animationDuration: `var(--twinkle-duration)`,
                boxShadow: star.size > 1.5 ? `0 0 6px ${star.color}` : "none",
                opacity: star.opacity,
              } as React.CSSProperties}
            />
          ))}
        </motion.div>
      )}

      {/* MOVING WRAPPER */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center w-full h-full"
        style={{
          x: sectionX,
          y: sectionY,
          scale: finalWrapperScale, 
          transformOrigin: "center center"
        }}
      >
        
        {/* RINGS */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ scale: baseRingScale }}
        >
          {rings.map((ring, index) => (
            <div
              key={index}
              className="absolute aspect-square rounded-full border-[#b6ff7a32]"
              style={{
                width: `${ring.baseWidth}vw`,
                opacity: ring.opacity,
                borderWidth: `${ring.thickness}px`,
              }}
            />
          ))}
        </motion.div>

        {/* VIDEO */}
        <motion.div
          className="absolute w-full h-full flex items-center justify-center pointer-events-none z-30"
          style={{ scale: baseVideoScale, transformOrigin: "50% 50%" }}
        >
          <video
            loop autoPlay muted playsInline preload="auto" aria-hidden="true" disablePictureInPicture
            poster="/home-preview/blackhole-poster.webp"
            className="w-full h-full object-cover mix-blend-screen"
          >
            <source src="/home-preview/blackhole-loop.webm" type="video/webm" />
          </video>
        </motion.div>

      </motion.div>
    </div>
  );
}