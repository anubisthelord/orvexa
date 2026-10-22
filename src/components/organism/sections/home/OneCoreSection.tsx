"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

interface OneCoreSectionProps {
  scrollProgress: MotionValue<number>;
}

// Hoisted — built once per module, not per render
const RANGE: [number, number, number, number] = [0.52, 0.56, 0.62, 0.66];
const OPACITY_VALUES: [number, number, number, number] = [0, 1, 1, 0];
const X_VALUES: [number, number, number, number] = [-40, 0, 0, -40];

const TITLE = (
  <>
    Every layer of defence,
    <br className="hidden sm:block" />
    {" "}
    <span className="text-[#6bef1a]">Pulled into one core.</span>
  </>
);

export default function OneCoreSection({ scrollProgress }: OneCoreSectionProps) {
  const opacity = useTransform(scrollProgress, RANGE, OPACITY_VALUES);
  const x = useTransform(scrollProgress, RANGE, X_VALUES);

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center"
    >
      <div className="w-full container mx-auto">
        <SectionHeading
          label="One Ecosystem, No Fixed Contracts"
          title={TITLE}
          description="Discover, test, protect, detect, and respond — one integrated, sovereign European security lifecycle. Instead of managing six different vendors that never talk to each other, Orizon brings every critical layer of your defense into a single, unified platform. Eliminate blind spots, reduce complexity, and secure your entire attack surface."
          descriptionWidth="2xl"
          level={2}
          align="left"
          className="mb-10 sm:mb-12 magical-border-left pl-8"
        />
      </div>
    </motion.div>
  );
}