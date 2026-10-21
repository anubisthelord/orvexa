"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import {
  FlagUs,
  FlagEu,
  FlagIn,
  FlagJp,
  FlagCn,
  FlagRu,
  FlagCa,
  FlagGb,
} from "@sankyu/react-circle-flags";

interface ExploreSectionProps {
  scrollProgress: MotionValue<number>;
}

const AGENCIES = [
  { id: "nasa", title: "NASA", desc: "United States federal space and research agency", Flag: FlagUs },
  { id: "esa",  title: "ESA",  desc: "Europe's intergovernmental space exploration body", Flag: FlagEu },
  { id: "isro", title: "ISRO", desc: "India's national space research organization", Flag: FlagIn },
  { id: "jaxa", title: "JAXA", desc: "Japan's national aerospace and space agency", Flag: FlagJp },
  { id: "cnsa", title: "CNSA", desc: "China's national space administration agency", Flag: FlagCn },
  { id: "roscosmos", title: "Roscosmos", desc: "Russia's state space corporation and agency", Flag: FlagRu },
  { id: "csa",  title: "CSA",  desc: "Canadian space agency for exploration missions", Flag: FlagCa },
  { id: "uksa", title: "UKSA", desc: "United Kingdom space agency for innovation", Flag: FlagGb },
];

export default function ExploreSection({ scrollProgress }: ExploreSectionProps) {
  const opacity = useTransform(scrollProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);
  const y = useTransform(scrollProgress, [0.85, 0.90, 1, 1], [50, 0, 0, 0]);

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
    >
      {/* Ring Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl aspect-[16/10] pointer-events-auto">
        
        {/* Subtle visual ring path */}
        <div className="absolute inset-[12%] rounded-[50%] border border-green-500/10 pointer-events-none" />

        {AGENCIES.map((agency, i) => {
          // Math for perfect 8-card circular distribution
          const angle = (i * 360) / 8; 
          
          // Add an offset of 22.5 degrees to prevent cards from clipping at the very top/bottom
          const radians = ((angle - 90 + 22.5) * Math.PI) / 180;
          
          // Elliptical radius for a wide layout
          const radiusX = 45; 
          const radiusY = 38; 
          
          const x = Math.cos(radians) * radiusX;
          const yPos = Math.sin(radians) * radiusY;

          const { Flag } = agency;
          
          return (
            <div
              key={agency.id}
              className="absolute group"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${yPos}%)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-[260px] bg-bg p-4 border border-border magical-border-left rounded-md shadow-2xl backdrop-blur-md">
                
                {/* Header Row: Flag + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0 border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Flag className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white text-lg font-sans font-medium tracking-wide">
                    {agency.title}
                  </h3>
                </div>

                {/* Two-line Description */}
                <p className="text-sm text-gray-400 !leading-snug">
                  {agency.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}