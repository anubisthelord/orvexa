"use client";

import React from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

interface ServicesSectionProps {
  scrollProgress: MotionValue<number>;
}

const SERVICES = [
  {
    id: "recon", title: "RECON", desc: "Know what attackers see",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9m-9 16.5h9M4.5 7.5v9m15-9v9M3 12h18M6 6l12 12M18 6L6 18" />,
    position: "top-[25%] left-[10%] lg:left-[12%]", align: "left", isTopBottom: true, tilt: 20,
  },
  {
    id: "amare", title: "AMARE", desc: "Make your people the firewall",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
    position: "top-[45%] left-[10%] lg:left-[12%]", align: "left",
  },
  {
    id: "darkfield", title: "DARKFIELD", desc: "See your breach before the press does",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    position: "top-[65%] left-[10%] lg:left-[12%]", align: "left", isTopBottom: true, tilt: -20,
  },
  {
    id: "fireline", title: "FIRELINE", desc: "Pentesting at machine speed",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />,
    position: "top-[25%] right-[10%] lg:right-[12%]", align: "right", isTopBottom: true, tilt: -20,
  },
  {
    id: "oversight", title: "OVERSIGHT", desc: "Enterprise SOC, minus the bill",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    position: "top-[45%] right-[10%] lg:right-[12%]", align: "right",
  },
  {
    id: "orizon-ai", title: "ORIZON AI", desc: "AI that never phones home",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />,
    position: "top-[65%] right-[10%] lg:right-[12%]", align: "right", isTopBottom: true, tilt: 20,
  },
];

export default function ServicesSection({ scrollProgress }: ServicesSectionProps) {
// Inside ServicesSection.tsx, find and update these two lines:
const opacity = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.82], [0, 1, 1, 0]);
const y = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.82], [50, 0, 0, -50]);

// Also update the ring scale:
const rawRingScale = useTransform(scrollProgress, [0.68, 0.80], [0.8, 1.2]);
  const ringScale = useSpring(rawRingScale, { stiffness: 80, damping: 20 });

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 w-full h-full pointer-events-none z-20 ">

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        <span className="w-8 h-[1px] bg-green-500/50" />
        Six services. Zero gaps.
        <span className="w-8 h-[1px] bg-green-500/50" />
      </div>

      <motion.div
        style={{ scale: ringScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none"
      >
        <div className="absolute w-[420px] h-[420px] rounded-full bg-green-500/5 blur-[50px]" />
        <div className="absolute w-[340px] h-[340px] rounded-full border-2 border-green-500/30 shadow-[inset_0_0_30px_rgba(85,255,85,0.1),0_0_20px_rgba(85,255,85,0.1)]" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-green-500/40 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-green-500/20" />
      </motion.div>

      {SERVICES.map((service, i) => (
        <div 
          key={service.id} 
          className={`absolute ${service.position} pointer-events-auto group flex items-center ${
            service.align === "left" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div className="w-[280px] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded p-4 group-hover:border-green-500/40 transition-colors duration-500 z-10 relative">
            <div className={`flex items-center gap-3 mb-2 ${service.align === "left" ? "text-left" : "flex-row-reverse text-right"}`}>
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">{service.icon}</svg>
              </div>
              <h3 className="text-white font-mono text-sm font-bold tracking-widest">{service.title}</h3>
            </div>

            <p className={`text-gray-400 text-sm font-sans ${service.align === "left" ? "text-left" : "text-right"}`}>
              {service.desc}
            </p>
          </div>

          <div className={`flex items-center shrink-0 z-10 ${service.align === "left" ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-24 h-[2px] bg-green-500/50 group-hover:bg-green-400 transition-colors duration-500" />
            <div className="relative flex items-center justify-center w-5 h-5 mx-2">
              <div className="w-3 h-3 rounded-full border-[1.5px] border-green-500 bg-black z-10 group-hover:border-green-400 transition-colors duration-500" />
              <div className="absolute w-1 h-1 rounded-full bg-green-400 z-20 group-hover:bg-white transition-all duration-500" />
            </div>
            <div
              className={`relative flex items-center ${
                service.isTopBottom
                  ? `w-32 ${service.align === "left" ? "origin-left" : "origin-right"}`
                  : "w-16"
              }`}
              style={
                service.isTopBottom && service.tilt
                  ? { transform: `rotate(${service.tilt}deg)` }
                  : undefined
              }
            >
              <div className="w-full h-[2px] bg-green-500/50 group-hover:bg-green-400 transition-colors duration-500" />
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${
                  service.align === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
                }`}
              >
                <div className="relative flex items-center justify-center w-5 h-5">
                  <div className="w-5 h-5 rounded-full border-[1.5px] border-green-500 bg-black z-10 group-hover:border-green-400 transition-colors duration-500" />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-green-400 z-20 group-hover:bg-white transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-[8%] w-full mx-auto">
        <SectionHeading
          label="Mission Profile"
          title="Orizon Ecosystem"
          description="Step into any one of our six unified pillars — Discover, Verify, Protect, Automate, Defend, and Recover — because they all seamlessly feed into the exact same sovereign core."
          level={2}
          align="center"
          descriptionWidth="2xl"
        />
      </div>

    </motion.div>
  );
}