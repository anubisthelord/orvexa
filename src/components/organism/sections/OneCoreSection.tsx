"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

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
      <div className="w-full container mx-auto ">
        
      


        
        
        <SectionHeading
          label="One Ecosystem, No Fixed Contracts"
          title={
            <>
                 Every layer of defence,
              <br className="hidden sm:block" />
              {" "} <span className="text-[#6bef1a]">  Pulled into one core.</span>
            </>
          }
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