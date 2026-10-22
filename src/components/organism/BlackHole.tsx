"use client";
import { motion, MotionValue, useTransform } from "framer-motion";

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
  ringScale?: number;
  hold?: number;
  snapDuration?: number;
  noTop?: boolean;
}

interface BlackHoleProps {
  scrollProgress: MotionValue<number>;
  sections?: BlackHoleSectionConfig[];
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

function resolveScale(s: BlackHoleSectionConfig): number {
  if (s.preserveSize) return 1;
  if (s.scale !== undefined) return s.scale;
  if (s.maxScale !== undefined) return s.maxScale;
  if (s.minScale !== undefined) return s.minScale;
  return 1;
}

export default function BlackHole({ scrollProgress, sections = [] }: BlackHoleProps) {
  const baseVideoScale = useTransform(scrollProgress, [0, 0.5], [1.25, 0.8125]);
  const baseRingScale = useTransform(scrollProgress, [0, 0.5], [1, 1.25]);

  const totalSections = Math.max(...sections.map(s => s.section), 1) + 1;
  const sortedSections = [...sections].sort((a, b) => a.section - b.section);

  // Seed ALL outputs from section 0 so its config is honored on frame one.
  const first = sortedSections[0];
  const firstPos = POSITION_MAP[first?.position || "center"];

  const inputRange: number[] = [0];
  const xOutput: number[] = [firstPos.x];
  const yOutput: number[] = [firstPos.y];
  const scaleOverrideOutput: number[] = [first ? resolveScale(first) : 1];
  const ringScaleOutput: number[] = [first?.ringScale ?? 1];

  sortedSections.forEach((s, index) => {
    const sectionStart = s.section / (totalSections - 1);
    const sectionEnd = index < sortedSections.length - 1 
      ? sortedSections[index + 1].section / (totalSections - 1)
      : 1;
    
    const window = sectionEnd - sectionStart;
    const hold = s.hold ?? 0.65; 
    const snapDuration = s.snapDuration ?? 0.04;

    const holdEnd = sectionStart + window * hold;
    const snapEnd = Math.min(holdEnd + snapDuration, sectionEnd);

    const pos = POSITION_MAP[s.position || "center"];
    const scale = resolveScale(s);
    const ring = s.ringScale ?? 1;

    if (inputRange[inputRange.length - 1] !== sectionStart) {
      inputRange.push(sectionStart);
      xOutput.push(pos.x);
      yOutput.push(pos.y);
      scaleOverrideOutput.push(scale);
      ringScaleOutput.push(ring);
    }

    if (holdEnd > sectionStart && inputRange[inputRange.length - 1] !== holdEnd) {
      inputRange.push(holdEnd);
      xOutput.push(pos.x);
      yOutput.push(pos.y);
      scaleOverrideOutput.push(scale);
      ringScaleOutput.push(ring);
    }

    if (snapDuration > 0 && index < sortedSections.length - 1 && snapEnd > holdEnd) {
      const next = sortedSections[index + 1];
      const nextPos = POSITION_MAP[next.position || "center"];
      const nextScale = resolveScale(next);
      const nextRing = next.ringScale ?? 1;

      if (inputRange[inputRange.length - 1] !== snapEnd) {
        inputRange.push(snapEnd);
        xOutput.push(nextPos.x);
        yOutput.push(nextPos.y);
        scaleOverrideOutput.push(nextScale);
        ringScaleOutput.push(nextRing);
      }
    }
  });

  if (inputRange[inputRange.length - 1] < 1) {
    inputRange.push(1);
    xOutput.push(xOutput[xOutput.length - 1]);
    yOutput.push(yOutput[yOutput.length - 1]);
    scaleOverrideOutput.push(scaleOverrideOutput[scaleOverrideOutput.length - 1]);
    ringScaleOutput.push(ringScaleOutput[ringScaleOutput.length - 1]); 
  }

  const dedupInput: number[] = [];
  const dedupX: number[] = [];
  const dedupY: number[] = [];
  const dedupScale: number[] = [];
  const dedupRingScale: number[] = []; 

  for (let i = 0; i < inputRange.length; i++) {
    if (i === 0 || inputRange[i] > dedupInput[dedupInput.length - 1]) {
      dedupInput.push(inputRange[i]);
      dedupX.push(xOutput[i]);
      dedupY.push(yOutput[i]);
      dedupScale.push(scaleOverrideOutput[i]);
      dedupRingScale.push(ringScaleOutput[i]); 
    } else {
      dedupX[dedupX.length - 1] = xOutput[i];
      dedupY[dedupY.length - 1] = yOutput[i];
      dedupScale[dedupScale.length - 1] = scaleOverrideOutput[i];
      dedupRingScale[dedupRingScale.length - 1] = ringScaleOutput[i]; 
    }
  }

  const sectionX = useTransform(scrollProgress, dedupInput, dedupX);
  const sectionY = useTransform(scrollProgress, dedupInput, dedupY);
  const scale = useTransform(scrollProgress, dedupInput, dedupScale);
  const ringScaleOverride = useTransform(scrollProgress, dedupInput, dedupRingScale);

  // --- noTop: a true discrete step keyed ONLY on section boundaries ---
  // Never lerped. Switches hard at each section start.
  const noTopInput: number[] = [];
  const noTopStep: number[] = [];
  sortedSections.forEach((s) => {
    const start = s.section / (totalSections - 1);
    if (noTopInput.length === 0 || noTopInput[noTopInput.length - 1] !== start) {
      noTopInput.push(start);
      noTopStep.push(s.noTop ? 1 : 0);
    }
  });
  if (noTopInput[noTopInput.length - 1] < 1) {
    noTopInput.push(1);
    noTopStep.push(noTopStep[noTopStep.length - 1]);
  }

  const isNoTop = useTransform(scrollProgress, noTopInput, noTopStep);

  // Force Y to 0 whenever the active section is noTop.
  // Round to boolean: prevents the fractional-equality bug.
  const finalSectionY = useTransform([sectionY, isNoTop], ([y, noTop]) => {
    return (noTop as number) >= 0.5 ? 0 : (y as number);
  });

  const rings = Array.from({ length: 20 }).map((_, i) => {
    const baseWidth = 15 + i * 8.5; 
    const opacity = Math.max(0.02, 1 - i * 0.04); 
    const thickness = Math.max(0.5, 1 + (i * 0.05)); 
    return { baseWidth, opacity, thickness };
  });

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
        style={{
          x: useTransform(sectionX, (v) => `${v}vw`),
          y: useTransform(finalSectionY, (v) => `${v}vh`),
          scale: useTransform([ringScaleOverride, baseRingScale], ([override, base]: number[]) => override * base),
          transformOrigin: "center center",
          willChange: "transform",
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
        className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
        style={{
          x: useTransform(sectionX, (v) => `${v}vw`),
          y: useTransform(finalSectionY, (v) => `${v}vh`),
          scale: scale, 
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