"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface KillChainSectionProps {
  scrollProgress: MotionValue<number>;
}

const STAGES = [
  { 
    num: "1", 
    title: "Launch & Ascent", 
    desc: "Ignition sequence begins. The vehicle pushes through max-Q, shedding solid boosters and aligning for orbital insertion.", 
    icon: "rocket" 
  },
  { 
    num: "2", 
    title: "Orbit Insertion", 
    desc: "The main engine cuts off. The payload separates from the fairing and successfully enters low Earth orbit.", 
    icon: "orbit" 
  },
  { 
    num: "3", 
    title: "Trans-Lunar Injection", 
    desc: "A critical burn sets the spacecraft on a precise trajectory toward the lunar south pole, escaping Earth's gravity well.", 
    icon: "trajectory" 
  },
  { 
    num: "4", 
    title: "Deep Space Cruise", 
    desc: "Days of coasting. Solar arrays deploy, deep-space communications lock on, and navigation systems calibrate for lunar approach.", 
    icon: "satellite" 
  },
  { 
    num: "5", 
    title: "Lunar Orbit Capture", 
    desc: "The retro-burn slows the craft down, allowing the Moon's gravity to pull it into a stable, highly elliptical polar orbit.", 
    icon: "moon" 
  },
  { 
    num: "6", 
    title: "Powered Descent", 
    desc: "The lander separates. Autonomous thrusters fire for the final 10 kilometers, scanning the surface for a safe landing zone.", 
    icon: "descent" 
  },
  { 
    num: "7", 
    title: "Surface Operations", 
    desc: "Touchdown confirmed. The rover deploys, solar panels unfurl, and the first scientific telemetry begins transmitting to Earth.", 
    icon: "surface" 
  },
];

const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    rocket: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />,
    orbit: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z M12 21a9.004 9.004 0 008.716-6.747 M12 3a8.997 8.997 0 00-7.843 4.582" />,
    trajectory: <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />,
    satellite: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9m-9 16.5h9M4.5 7.5v9m15-9v9M3 12h18M6 6l12 12M18 6L6 18" />,
    moon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
    descent: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />,
    surface: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
    comms: <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />,
    power: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  };
  return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>{icons[name]}</svg>;
};

export default function KillChainSection({ scrollProgress }: KillChainSectionProps) {
// Inside KillChainSection.tsx
// Fades IN: 0.28 -> 0.35
// Fades OUT: 0.40 -> 0.42 (Gone before One Core starts)
const opacity = useTransform(scrollProgress, [0.28, 0.35, 0.40, 0.42], [0, 1, 1, 0]);
const y = useTransform(scrollProgress, [0.28, 0.35, 0.40, 0.42], [50, 0, 0, -50]);

// Add pointer-events logic so it doesn't block clicks when hidden
// (This prevents overlapping bugs)

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative pointer-events-none z-10  flex flex-col items-center backdrop-blur-lg  border-y border-[#55FF5548] border-dashed w-full  h-full mx-auto justify-center gap-20"
    >
      
      {/* 1. Header Section */}
      <div className="flex flex-col items-center text-center max-w-4xl px-4 z-20 w-full">
        <div className="flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] mb-3">
          <span className="w-8 h-[1px] bg-green-500/50" />
          Mission Profile // Artemis VII
          <span className="w-8 h-[1px] bg-green-500/50" />
        </div>
        
        <h1 
          className="relative z-10 text-4xl md:text-5xl font-sans tracking-tight text-white leading-[1.1] mb-4"
          style={{
            textShadow: `-1px -1px 0px rgba(255,255,255,0.8), 2px 2px 0px #000, 4px 4px 6px rgba(0,0,0,0.9)`
          }}
        >
          Seven stages of the mission<br />
          <span className="text-gray-400 font-normal">— Every phase critical to the journey</span>
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-10 font-sans">
          From the launchpad to the lunar surface, each phase requires precise orchestration. Break any link in the chain and the mission fails.
        </p>
      </div>

      {/* 2. The Timeline Grid */}
      <div className="relative w-full max-w-[1400px] flex justify-between z-20">
        
        {/* Horizontal Connecting Line */}
        <div className="absolute top-[45px] left-[8%] right-[8%] h-[1px] bg-gray-700/50" />

        {STAGES.map((stage, i) => (
          <div key={i} className="relative flex flex-col items-center w-[13%] min-w-[120px]">
            
            {/* Timeline Node */}
            <div className="flex flex-col items-center mb-2 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm mb-3 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {stage.num}
              </div>
              <div className="w-[1px] h-5 bg-gray-700/50" />
            </div>

            {/* Dark Info Card */}
            <div className="bg-[#111111]/80 backdrop-blur-sm border border-white/5 p-4 rounded-xl flex flex-col items-center text-center w-full h-full min-h-[200px]">
              <Icon name={stage.icon} className="w-5 h-5 text-gray-400 mb-3" />
              <h3 className="text-white   mb-1">{stage.title}</h3>
              <p className="text-gray-400 text-xs">
                {stage.desc}
              </p>
            </div>

            {/* 3. Service Chips (Space Systems) */}
            {i === 0 && (
              <div className="absolute -top-[85px] flex gap-2">
                <ServiceChip icon="power" label="IGNITION" />
              </div>
            )}
            {i === 1 && (
              <div className="absolute -top-[85px] flex gap-2">
                <ServiceChip icon="satellite" label="PAYLOAD" />
              </div>
            )}
            {i === 2 && (
               <div className="absolute -bottom-[85px] flex gap-2">
               <ServiceChip icon="trajectory" label="NAVIGATION" />
               <ServiceChip icon="comms" label="DEEP SPACE" />
             </div>
            )}
            {i === 3 && (
               <div className="absolute -top-[85px] flex gap-2">
               <ServiceChip icon="comms" label="TELEMETRY" />
               <ServiceChip icon="power" label="SOLAR" />
             </div>
            )}
            {i === 4 && (
               <div className="absolute -bottom-[85px] flex gap-2">
               <ServiceChip icon="orbit" label="LUNAR ORBIT" />
             </div>
            )}
            {i === 5 && (
               <div className="absolute -top-[85px] flex gap-2">
               <ServiceChip icon="descent" label="LANDER" />
             </div>
            )}
            {i === 6 && (
               <div className="absolute -bottom-[85px] flex gap-2">
               <ServiceChip icon="surface" label="ROVER" />
               <ServiceChip icon="comms" label="UPLINK" />
             </div>
            )}

          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ServiceChip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="relative group flex flex-col items-center justify-center p-3 rounded-xl w-[70px] h-[70px] overflow-hidden transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-900/10 backdrop-blur-lg rounded-xl" />
      <div className="absolute inset-0 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(34,197,94,0.15)] pointer-events-none" />
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors duration-300 rounded-xl" />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Icon name={icon} className="w-5 h-5 text-green-400 mb-1.5 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <span className="text-[8px] font-bold text-green-300 tracking-wider font-mono">{label}</span>
      </div>
    </div>
  );
}