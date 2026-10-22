"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";
import {
  HiOutlineMagnifyingGlassCircle,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineBolt,
  HiOutlineEye,
  HiOutlineCpuChip,
} from "react-icons/hi2";

interface ServicesSectionProps {
  scrollProgress: MotionValue<number>;
}

// Hoisted transform config — stable refs, allocated once per module
const RANGE: [number, number, number, number] = [0.68, 0.72, 0.8, 0.82];
const OPACITY_VALUES: [number, number, number, number] = [0, 1, 1, 0];
const Y_VALUES: [number, number, number, number] = [50, 0, 0, -50];
const RING_RANGE: [number, number] = [0.68, 0.8];
const RING_VALUES: [number, number] = [0.8, 1.2];
const SPRING = { stiffness: 80, damping: 20 } as const;

// Every entry has the SAME shape — `as const` produces a uniform tuple,
// so destructuring `isTopBottom` / `tilt` compiles without unions or casts.
const SERVICES = [
  { id: "recon",     title: "RECON",     desc: "Know what attackers see",               Icon: HiOutlineMagnifyingGlassCircle, position: "top-[25%] left-[10%] lg:left-[12%]",   align: "left",  isTopBottom: true,  tilt: 20  },
  { id: "amare",     title: "AMARE",     desc: "Make your people the firewall",         Icon: HiOutlineShieldCheck,           position: "top-[45%] left-[10%] lg:left-[12%]",   align: "left",  isTopBottom: false, tilt: 0   },
  { id: "darkfield", title: "DARKFIELD", desc: "See your breach before the press does", Icon: HiOutlineLockClosed,            position: "top-[65%] left-[10%] lg:left-[12%]",   align: "left",  isTopBottom: true,  tilt: -20 },
  { id: "fireline",  title: "FIRELINE",  desc: "Pentesting at machine speed",           Icon: HiOutlineBolt,                  position: "top-[25%] right-[10%] lg:right-[12%]", align: "right", isTopBottom: true,  tilt: -20 },
  { id: "oversight", title: "OVERSIGHT", desc: "Enterprise SOC, minus the bill",        Icon: HiOutlineEye,                   position: "top-[45%] right-[10%] lg:right-[12%]", align: "right", isTopBottom: false, tilt: 0   },
  { id: "orizon-ai", title: "ORIZON AI", desc: "AI that never phones home",             Icon: HiOutlineCpuChip,               position: "top-[65%] right-[10%] lg:right-[12%]", align: "right", isTopBottom: true,  tilt: 20  },
] as const;

export default function ServicesSection({ scrollProgress }: ServicesSectionProps) {
  const opacity = useTransform(scrollProgress, RANGE, OPACITY_VALUES);
  const y = useTransform(scrollProgress, RANGE, Y_VALUES);
  const rawRingScale = useTransform(scrollProgress, RING_RANGE, RING_VALUES);
  const ringScale = useSpring(rawRingScale, SPRING);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 w-full h-full pointer-events-none z-20">
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

      {SERVICES.map(({ id, title, desc, Icon, position, align, isTopBottom, tilt }) => {
        const isLeft = align === "left";
        return (
          <div
            key={id}
            className={`absolute ${position} pointer-events-auto group flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className="w-[280px] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded p-4 group-hover:border-green-500/40 transition-colors duration-500 z-10 relative">
              <div className={`flex items-center gap-3 mb-2 ${isLeft ? "text-left" : "flex-row-reverse text-right"}`}>
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-mono text-sm font-bold tracking-widest">{title}</h3>
              </div>
              <p className={`text-gray-400 text-sm font-sans ${isLeft ? "text-left" : "text-right"}`}>
                {desc}
              </p>
            </div>

            <div className={`flex items-center shrink-0 z-10 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
              <div className="w-24 h-[2px] bg-green-500/50 group-hover:bg-green-400 transition-colors duration-500" />
              <div className="relative flex items-center justify-center w-5 h-5 mx-2">
                <div className="w-3 h-3 rounded-full border-[1.5px] border-green-500 bg-black z-10 group-hover:border-green-400 transition-colors duration-500" />
                <div className="absolute w-1 h-1 rounded-full bg-green-400 z-20 group-hover:bg-white transition-all duration-500" />
              </div>
              <div
                className={`relative flex items-center ${
                  isTopBottom ? `w-32 ${isLeft ? "origin-left" : "origin-right"}` : "w-16"
                }`}
                style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
              >
                <div className="w-full h-[2px] bg-green-500/50 group-hover:bg-green-400 transition-colors duration-500" />
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
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
        );
      })}

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