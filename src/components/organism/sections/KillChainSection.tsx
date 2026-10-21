"use client";

import React, { ReactNode } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";
import {
  HiOutlineRocketLaunch,
  HiOutlineGlobeAlt,
  HiOutlineArrowTrendingUp,
  HiOutlineSignal,
  HiOutlineMoon,
  HiOutlineArrowDown,
  HiOutlineServerStack,
} from "react-icons/hi2";

interface KillChainSectionProps {
  scrollProgress: MotionValue<number>;
}

type Stage = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const STAGES: Stage[] = [
  { 
    title: "Launch & Ascent", 
    desc: "Ignition sequence begins. The vehicle pushes through max-Q, shedding solid boosters and aligning for orbital insertion.", 
    icon: <HiOutlineRocketLaunch /> 
  },
  { 
    title: "Orbit Insertion", 
    desc: "The main engine cuts off. The payload separates from the fairing and successfully enters low Earth orbit.", 
    icon: <HiOutlineGlobeAlt /> 
  },
  { 
    title: "Trans-Lunar Injection", 
    desc: "A critical burn sets the spacecraft on a precise trajectory toward the lunar south pole, escaping Earth's gravity well.", 
    icon: <HiOutlineArrowTrendingUp /> 
  },
  { 
    title: "Deep Space Cruise", 
    desc: "Days of coasting. Solar arrays deploy, deep-space communications lock on, and navigation systems calibrate for lunar approach.", 
    icon: <HiOutlineSignal /> 
  },
  { 
    title: "Lunar Orbit Capture", 
    desc: "The retro-burn slows the craft down, allowing the Moon's gravity to pull it into a stable, highly elliptical polar orbit.", 
    icon: <HiOutlineMoon /> 
  },
  { 
    title: "Powered Descent", 
    desc: "The lander separates. Autonomous thrusters fire for the final 10 kilometers, scanning the surface for a safe landing zone.", 
    icon: <HiOutlineArrowDown /> 
  },
  { 
    title: "Surface Operations", 
    desc: "Touchdown confirmed. The rover deploys, solar panels unfurl, and the first scientific telemetry begins transmitting to Earth.", 
    icon: <HiOutlineServerStack /> 
  },
];

export default function KillChainSection({ scrollProgress }: KillChainSectionProps) {
  const opacity = useTransform(scrollProgress, [0.28, 0.35, 0.40, 0.42], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.28, 0.35, 0.40, 0.42], [50, 0, 0, -50]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative pointer-events-auto z-10 flex flex-col items-center backdrop-blur-xl border-dashed w-full h-full mx-auto justify-center gap-12"
    >
      <SectionHeading
        label="Mission Profile"
        title="Seven stages of the mission — Every phase critical to the journey"
        description="From the launchpad to the lunar surface, each phase requires precise orchestration. Break any link in the chain and the mission fails."
        level={2}
        align="center"
        descriptionWidth="2xl"
      />

      <div className="relative w-full container z-20 overflow-visible">
        
        {/* The Grid */}
        <div className="grid grid-cols-7 gap-5 w-full items-stretch">
          {STAGES.map((stage, i) => {
            const isDown = i % 2 !== 0;

            return (
              <div 
                key={i} 
                className={`relative flex flex-col items-center w-full ${
                  isDown ? "justify-start" : "justify-end"
                }`}
              >
                
                {/* The Card Container */}
                <div 
                  className={`bg-bg backdrop-blur-2xl border border-border p-2.5 !py-5 rounded flex flex-col items-center text-center w-full z-10 ${
                    isDown ? "order-3 magical-border-left mt-4" : "order-1 magical-border-right mb-4"
                  }`}
                >
                  <span className="text-xl  mb-3 border border-border rounded p-1">
                    {stage.icon}
                  </span>
                  <h3 className="mb-1 !text-lg">
                    {stage.title}
                  </h3>
                  <p className="text-sm">
                    {stage.desc}
                  </p>
                </div>

                {/* The Connector Line */}
                <div 
                  className={`w-[1px] h-8 bg-gray-700/50 z-0 ${
                    isDown ? "order-2" : "order-2"
                  }`} 
                />

                {/* The Number Node */}
                <div className="w-8 h-8 shrink-0 rounded flex items-center justify-center magical-border-left z-20 order-2">
                  <span className="text-white font-bold text-xl">{i + 1}</span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}