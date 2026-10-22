
"use client";

import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type BlackHolePosition =
  | "center"
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "center-right"
  | "center-left";

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

const POSITION_MAP: Record<
  BlackHolePosition,
  { x: number; y: number }
> = {
  center: { x: 0, y: 0 },
  "top-right": { x: 22, y: -22 },
  "top-left": { x: -22, y: -22 },
  "bottom-right": { x: 22, y: 22 },
  "bottom-left": { x: -22, y: 22 },
  "center-right": { x: 25, y: 0 },
  "center-left": { x: -25, y: 0 },
};

function resolveScale(section: BlackHoleSectionConfig): number {
  if (section.preserveSize) return 1;
  if (section.scale !== undefined) return section.scale;
  if (section.maxScale !== undefined) return section.maxScale;
  if (section.minScale !== undefined) return section.minScale;

  return 1;
}

export default function BlackHole({
  scrollProgress,
  sections = [],
}: BlackHoleProps) {
  // Base scaling tied to scroll progress.
  const baseVideoScale = useTransform(
    scrollProgress,
    [0, 0.5],
    [1.25, 0.8125],
  );

  const baseRingScale = useTransform(
    scrollProgress,
    [0, 0.5],
    [1, 1.25],
  );

  const totalSections =
    Math.max(...sections.map((section) => section.section), 1) + 1;

  const sortedSections = [...sections].sort(
    (a, b) => a.section - b.section,
  );

  // Build position and scale keyframes from your existing section config.
  const first = sortedSections[0];
  const firstPosition = POSITION_MAP[first?.position || "center"];

  const inputRange: number[] = [0];
  const xOutput: number[] = [firstPosition.x];
  const yOutput: number[] = [firstPosition.y];

  const scaleOutput: number[] = [
    first ? resolveScale(first) : 1,
  ];

  const ringScaleOutput: number[] = [first?.ringScale ?? 1];

  sortedSections.forEach((section, index) => {
    const sectionStart =
      section.section / (totalSections - 1);

    const sectionEnd =
      index < sortedSections.length - 1
        ? sortedSections[index + 1].section /
          (totalSections - 1)
        : 1;

    const window = sectionEnd - sectionStart;
    const hold = section.hold ?? 0.65;
    const snapDuration = section.snapDuration ?? 0.07;

    const holdEnd = sectionStart + window * hold;
    const snapEnd = Math.min(
      holdEnd + snapDuration,
      sectionEnd,
    );

    const position = POSITION_MAP[section.position || "center"];
    const scale = resolveScale(section);
    const ringScale = section.ringScale ?? 1;

    if (inputRange[inputRange.length - 1] !== sectionStart) {
      inputRange.push(sectionStart);
      xOutput.push(position.x);
      yOutput.push(position.y);
      scaleOutput.push(scale);
      ringScaleOutput.push(ringScale);
    }

    if (
      holdEnd > sectionStart &&
      inputRange[inputRange.length - 1] !== holdEnd
    ) {
      inputRange.push(holdEnd);
      xOutput.push(position.x);
      yOutput.push(position.y);
      scaleOutput.push(scale);
      ringScaleOutput.push(ringScale);
    }

    if (
      snapDuration > 0 &&
      index < sortedSections.length - 1 &&
      snapEnd > holdEnd
    ) {
      const next = sortedSections[index + 1];
      const nextPosition =
        POSITION_MAP[next.position || "center"];

      if (inputRange[inputRange.length - 1] !== snapEnd) {
        inputRange.push(snapEnd);
        xOutput.push(nextPosition.x);
        yOutput.push(nextPosition.y);
        scaleOutput.push(resolveScale(next));
        ringScaleOutput.push(next.ringScale ?? 1);
      }
    }
  });

  // Ensure the animation timeline reaches progress 1.
  if (inputRange[inputRange.length - 1] < 1) {
    inputRange.push(1);
    xOutput.push(xOutput[xOutput.length - 1]);
    yOutput.push(yOutput[yOutput.length - 1]);
    scaleOutput.push(scaleOutput[scaleOutput.length - 1]);
    ringScaleOutput.push(
      ringScaleOutput[ringScaleOutput.length - 1],
    );
  }

  // Remove duplicate input values to avoid invalid interpolation ranges.
  const dedupInput: number[] = [];
  const dedupX: number[] = [];
  const dedupY: number[] = [];
  const dedupScale: number[] = [];
  const dedupRingScale: number[] = [];

  for (let i = 0; i < inputRange.length; i++) {
    if (
      i === 0 ||
      inputRange[i] > dedupInput[dedupInput.length - 1]
    ) {
      dedupInput.push(inputRange[i]);
      dedupX.push(xOutput[i]);
      dedupY.push(yOutput[i]);
      dedupScale.push(scaleOutput[i]);
      dedupRingScale.push(ringScaleOutput[i]);
    } else {
      // Preserve the latest value at an identical progress point.
      dedupX[dedupX.length - 1] = xOutput[i];
      dedupY[dedupY.length - 1] = yOutput[i];
      dedupScale[dedupScale.length - 1] = scaleOutput[i];
      dedupRingScale[dedupRingScale.length - 1] =
        ringScaleOutput[i];
    }
  }

  const sectionX = useTransform(
    scrollProgress,
    dedupInput,
    dedupX,
  );

  const sectionY = useTransform(
    scrollProgress,
    dedupInput,
    dedupY,
  );

  const scale = useTransform(
    scrollProgress,
    dedupInput,
    dedupScale,
  );

  const ringScaleOverride = useTransform(
    scrollProgress,
    dedupInput,
    dedupRingScale,
  );

  // Keep noTop as a discrete section setting.
  const noTopInput: number[] = [];
  const noTopStep: number[] = [];

  sortedSections.forEach((section) => {
    const start = section.section / (totalSections - 1);

    if (
      noTopInput.length === 0 ||
      noTopInput[noTopInput.length - 1] !== start
    ) {
      noTopInput.push(start);
      noTopStep.push(section.noTop ? 1 : 0);
    }
  });

  if (
    noTopInput.length > 0 &&
    noTopInput[noTopInput.length - 1] < 1
  ) {
    noTopInput.push(1);
    noTopStep.push(noTopStep[noTopStep.length - 1]);
  }

  const isNoTop = useTransform(
    scrollProgress,
    noTopInput.length > 0 ? noTopInput : [0, 1],
    noTopStep.length > 0 ? noTopStep : [0, 0],
  );

  // Preserve noTop behavior while smoothing movement toward its target.
  const finalSectionY = useTransform(
    [sectionY, isNoTop],
    ([y, noTop]) =>
      (noTop as number) >= 0.5 ? 0 : (y as number),
  );

  // Spring smoothing reduces abrupt position changes.
  const smoothSectionX = useSpring(sectionX, {
    stiffness: 45,
    damping: 24,
    mass: 1.2,
  });

  const smoothSectionY = useSpring(finalSectionY, {
    stiffness: 45,
    damping: 24,
    mass: 1.2,
  });

  const smoothScale = useSpring(scale, {
    stiffness: 55,
    damping: 26,
    mass: 1,
  });

  const smoothRingScale = useSpring(ringScaleOverride, {
    stiffness: 55,
    damping: 26,
    mass: 1,
  });

  const smoothVideoScale = useSpring(baseVideoScale, {
    stiffness: 55,
    damping: 26,
    mass: 1,
  });

  const xPosition = useTransform(
    smoothSectionX,
    (value) => `${value}vw`,
  );

  const yPosition = useTransform(
    smoothSectionY,
    (value) => `${value}vh`,
  );

  const finalRingScale = useTransform(
    [smoothRingScale, baseRingScale],
    ([override, base]: number[]) => override * base,
  );

  // Ring visuals remain unchanged.
  const rings = Array.from({ length: 20 }, (_, index) => {
    const baseWidth = 15 + index * 8.5;
    const opacity = Math.max(0.02, 1 - index * 0.04);
    const thickness = Math.max(0.5, 1 + index * 0.05);

    return {
      baseWidth,
      opacity,
      thickness,
    };
  });

  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-transparent pointer-events-none">
      {/* Background rings */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none"
        style={{
          x: xPosition,
          y: yPosition,
          scale: finalRingScale,
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
              willChange: "transform, opacity",
            }}
          />
        ))}
      </motion.div>

      {/* Black hole video */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none"
        style={{
          x: xPosition,
          y: yPosition,
          scale: smoothScale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <motion.div
          className="absolute flex h-full w-full items-center justify-center"
          style={{
            scale: smoothVideoScale,
            transformOrigin: "50% 50%",
          }}
        >
          <video
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            poster="/home-preview/blackhole-poster.webp"
            className="h-full w-full object-cover mix-blend-screen"
          >
            <source
              src="/home-preview/blackhole-loop.webm"
              type="video/webm"
            />
          </video>
        </motion.div>
      </motion.div>
    </div>
  );
}
