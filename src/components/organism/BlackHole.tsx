"use client";

import React from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";
import Starfield3D from "./sections/simple/Starfield3D";

export type BlackHolePosition = 
  | "center" 
  | "top-right" | "top-left" 
  | "bottom-right" | "bottom-left"
  | "center-right" | "center-left";

export interface BlackHoleSectionConfig {
  section: number; 
  scale?: number;     
  minScale?: number;  
  maxScale?: number;  
  position?: BlackHolePosition; 
  preserveSize?: boolean; 
  showStars?: boolean;
  /** Control ring scale independently. */
  ringScale?: number;
}

interface BlackHoleProps {
  scrollProgress: MotionValue<number>;
  sections?: BlackHoleSectionConfig[];
  showStars?: boolean;
}

const POSITION_MAP: Record<BlackHolePosition, { x: number; y: number }> = {
  "center":       { x: 0,   y: 0 },
  "top-right":    { x: 22,  y: -22 },
  "top-left":     { x: -22, y: -22 },
  "bottom-right": { x: 22,  y: 22 },
  "bottom-left":  { x: -22, y: 22 },
  "center-right": { x: 25,  y: 0 },
  "center-left":  { x: -25, y: 0 },
};

export default function BlackHole({ scrollProgress, sections = [], showStars = true }: BlackHoleProps) {
  const baseVideoScale = useTransform(scrollProgress, [0, 0.5], [1.25, 0.8125]);
  const baseRingScale = useTransform(scrollProgress, [0, 0.5], [1, 1.25]);

  const totalSections = Math.max(...sections.map(s => s.section), 1) + 1;
  const sortedSections = [...sections].sort((a, b) => a.section - b.section);

  const inputRange: number[] = [0];
  const xOutput: number[] = [POSITION_MAP["center"].x];
  const yOutput: number[] = [POSITION_MAP["center"].y];
  const scaleOverrideOutput: number[] = [1]; 
  const starsOpacityOutput: number[] = [showStars ? 1 : 0];
  const ringScaleOutput: number[] = [1]; 

  sortedSections.forEach((s, index) => {
    const progress = s.section / (totalSections - 1);

    const currentStars = s.showStars !== undefined ? (s.showStars ? 1 : 0) : (showStars ? 1 : 0);
    const prevStars = index > 0 
      ? (sortedSections[index - 1].showStars !== undefined ? (sortedSections[index - 1].showStars ? 1 : 0) : (showStars ? 1 : 0))
      : (showStars ? 1 : 0);

    if (prevStars === 1 && currentStars === 0 && inputRange[inputRange.length - 1] !== progress) {
      const fadeStartProgress = progress - 0.06; 
      if (fadeStartProgress > inputRange[inputRange.length - 1]) {
        inputRange.push(fadeStartProgress);
        xOutput.push(xOutput[xOutput.length - 1]);
        yOutput.push(yOutput[yOutput.length - 1]);
        scaleOverrideOutput.push(scaleOverrideOutput[scaleOverrideOutput.length - 1]);
        starsOpacityOutput.push(1); 
        ringScaleOutput.push(ringScaleOutput[ringScaleOutput.length - 1]); 
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

      ringScaleOutput.push(s.ringScale !== undefined ? s.ringScale : 1);
      starsOpacityOutput.push(currentStars);
    }
  });

  if (inputRange[inputRange.length - 1] < 1) {
    inputRange.push(1);
    xOutput.push(xOutput[xOutput.length - 1]);
    yOutput.push(yOutput[yOutput.length - 1]);
    scaleOverrideOutput.push(scaleOverrideOutput[scaleOverrideOutput.length - 1]);
    starsOpacityOutput.push(starsOpacityOutput[starsOpacityOutput.length - 1]);
    ringScaleOutput.push(ringScaleOutput[ringScaleOutput.length - 1]); 
  }

  const dedupInput: number[] = [];
  const dedupX: number[] = [];
  const dedupY: number[] = [];
  const dedupScale: number[] = [];
  const dedupStars: number[] = [];
  const dedupRingScale: number[] = []; 

  for (let i = 0; i < inputRange.length; i++) {
    if (i === 0 || inputRange[i] > dedupInput[dedupInput.length - 1]) {
      dedupInput.push(inputRange[i]);
      dedupX.push(xOutput[i]);
      dedupY.push(yOutput[i]);
      dedupScale.push(scaleOverrideOutput[i]);
      dedupStars.push(starsOpacityOutput[i]);
      dedupRingScale.push(ringScaleOutput[i]); 
    } else {
      dedupX[dedupX.length - 1] = xOutput[i];
      dedupY[dedupY.length - 1] = yOutput[i];
      dedupScale[dedupScale.length - 1] = scaleOverrideOutput[i];
      dedupStars[dedupStars.length - 1] = starsOpacityOutput[i];
      dedupRingScale[dedupRingScale.length - 1] = ringScaleOutput[i]; 
    }
  }

  const sectionX = useTransform(scrollProgress, dedupInput, dedupX);
  const sectionY = useTransform(scrollProgress, dedupInput, dedupY);
  const rawWrapperScale = useTransform(scrollProgress, dedupInput, dedupScale);
  const finalWrapperScale = useSpring(rawWrapperScale, { stiffness: 80, damping: 20 });  
  
  const rawStarsOpacity = useTransform(scrollProgress, dedupInput, dedupStars);
  const starsOpacity = useSpring(rawStarsOpacity, { stiffness: 80, damping: 20 });

  const rawRingScaleOverride = useTransform(scrollProgress, dedupInput, dedupRingScale);
  const ringScaleOverride = useSpring(rawRingScaleOverride, { stiffness: 80, damping: 20 });

  const rings = Array.from({ length: 20 }).map((_, i) => {
    const baseWidth = 15 + i * 8.5; 
    const opacity = Math.max(0.02, 1 - i * 0.04); 
    const thickness = Math.max(0.5, 1 + (i * 0.05)); 
    return { baseWidth, opacity, thickness };
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#050505] z-0">
      {showStars && <Starfield3D opacity={starsOpacity} />}

      <motion.div 
        className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-20"
        style={{
          x: useTransform(sectionX, (v) => `${v}vw`),
          y: useTransform(sectionY, (v) => `${v}vh`),
          // FIX: Typed the array parameters as numbers
          scale: useTransform([ringScaleOverride, baseRingScale], ([override, base]: number[]) => override * base),
          transformOrigin: "center center",
          willChange: "transform",
          // Fade the rings near the top-center and bottom-center.
          // Rings stay crisp on the sides and horizontal middle.
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 45% at 50% 0%, transparent 0%, black 60%), " +
            "radial-gradient(ellipse 55% 45% at 50% 100%, transparent 0%, black 60%), " +
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.35) 100%)",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 50% 0%, transparent 0%, black 60%), " +
            "radial-gradient(ellipse 55% 45% at 50% 100%, transparent 0%, black 60%), " +
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.35) 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        {rings.map((ring, index) => (
          <div
            key={index}
            className="absolute aspect-square rounded-full border border-[#b6ff7a]/20"
            style={{
              width: `${ring.baseWidth}vw`,
              opacity: ring.opacity,
              borderWidth: `${ring.thickness}px`,
              willChange: "transform, opacity"
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-30"
        style={{
          x: useTransform(sectionX, (v) => `${v}vw`),
          y: useTransform(sectionY, (v) => `${v}vh`),
          scale: finalWrapperScale, 
          transformOrigin: "center center",
          willChange: "transform"
        }}
      >
        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
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