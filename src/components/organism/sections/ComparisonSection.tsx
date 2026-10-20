"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ComparisonSectionProps {
  scrollProgress: MotionValue<number>;
}

const TABLE_DATA = [
  { dimension: "Coverage", orizon: "All six services", vendors: "One tool each", inhouse: "Build each" },
  { dimension: "Entry cost", orizon: "from €90", vendors: "€15-50K / tool", inhouse: "€1M+ /yr", highlight: true },
  { dimension: "Time to value", orizon: "Minutes", vendors: "Weeks", inhouse: "Months" },
  { dimension: "Single pane of glass", orizon: "check", vendors: "cross", inhouse: "cross" },
  { dimension: "NIS2 reporting", orizon: "check", vendors: "dash", inhouse: "cross" },
  { dimension: "EU data sovereignty", orizon: "check", vendors: "dash", inhouse: "dash" },
];

export default function ComparisonSection({ scrollProgress }: ComparisonSectionProps) {
  const opacity = useTransform(scrollProgress, [0.70, 0.75, 0.83, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.70, 0.75, 0.83, 0.85], [50, 0, 0, -50]);

  const renderIcon = (type: string) => {
    if (type === "check") {
      return (
        <div className="w-5 h-5 rounded-full border border-green-500/50 flex items-center justify-center bg-green-500/10">
          <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (type === "cross") {
      return (
        <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center">
        <div className="w-2 h-[1px] bg-gray-500" />
      </div>
    );
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-end pr-[10%]"
    >
      <div className="w-full max-w-3xl flex flex-col items-start pr-8">
        
        <div className="flex flex-col items-end text-right w-full mb-8">
          <div className="flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] mb-3">
            THE COMPARISON
            <span className="w-8 h-[1px] bg-green-500/50" />
          </div>
          
          <h1 
            className="text-white text-4xl md:text-5xl font-sans tracking-tight leading-[1.1] mb-2"
            style={{
              textShadow: `-1px -1px 0px rgba(255,255,255,0.8), 2px 2px 0px #000, 4px 4px 6px rgba(0,0,0,0.9)`
            }}
          >
            Full coverage.
          </h1>
          <h1 className="text-[#55ff55] text-4xl md:text-5xl font-sans font-bold tracking-tight leading-[1.1] drop-shadow-[0_0_15px_rgba(85,255,85,0.3)]">
            One sovereign platform.
          </h1>
        </div>

        <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-4 border-b border-white/10 bg-white/5">
            <div className="p-4 flex items-center">
              <span className="text-gray-500 font-mono text-[9px] tracking-[0.2em] uppercase">Dimension</span>
            </div>
            <div className="p-4 flex items-center justify-center bg-[#55ff55] rounded-t-xl -mt-2 -mb-2 shadow-[0_-5px_20px_rgba(85,255,85,0.2)]">
              <span className="text-black font-bold font-mono text-[10px] tracking-widest uppercase">Orizon</span>
            </div>
            <div className="p-4 flex items-center justify-center border-l border-white/5">
              <span className="text-gray-400 font-mono text-[9px] tracking-[0.2em] uppercase">Separate vendors</span>
            </div>
            <div className="p-4 flex items-center justify-center border-l border-white/5">
              <span className="text-gray-400 font-mono text-[9px] tracking-[0.2em] uppercase">In-house build</span>
            </div>
          </div>

          <div className="flex flex-col">
            {TABLE_DATA.map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors`}
              >
                <div className="p-4 flex items-center">
                  <span className="text-gray-300 font-sans text-sm">{row.dimension}</span>
                </div>

                <div className={`p-4 flex items-center justify-center bg-green-500/5 border-x border-green-500/10`}>
                  {["check", "cross", "dash"].includes(row.orizon) ? (
                    renderIcon(row.orizon)
                  ) : (
                    <span className={`font-sans text-sm ${row.highlight ? 'text-[#55ff55] font-bold text-lg drop-shadow-[0_0_8px_rgba(85,255,85,0.4)]' : 'text-green-400 font-medium'}`}>
                      {row.orizon}
                    </span>
                  )}
                </div>

                <div className="p-4 flex items-center justify-center border-r border-white/5">
                  {["check", "cross", "dash"].includes(row.vendors) ? (
                    renderIcon(row.vendors)
                  ) : (
                    <span className="text-gray-500 font-sans text-sm">{row.vendors}</span>
                  )}
                </div>

                <div className="p-4 flex items-center justify-center">
                  {["check", "cross", "dash"].includes(row.inhouse) ? (
                    renderIcon(row.inhouse)
                  ) : (
                    <span className="text-gray-500 font-sans text-sm">{row.inhouse}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}