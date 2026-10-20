"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ExploreSectionProps {
  scrollProgress: MotionValue<number>;
}

const EXPLORE_LINKS = [
  { id: "services", title: "Services", desc: "All six services", action: "VIEW SERVICES", position: "top-[25%] left-[10%] lg:left-[12%]", align: "left" },
  { id: "nis2", title: "NIS2 Compliance", desc: "Audit-ready", action: "LEARN MORE", position: "top-[45%] left-[10%] lg:left-[12%]", align: "left" },
  { id: "compare", title: "Compare", desc: "vs the rest", action: "SEE COMPARISON", position: "top-[65%] left-[10%] lg:left-[12%]", align: "left" },
  { id: "company", title: "Company", desc: "About Orizon", action: "OUR STORY", position: "top-[25%] right-[10%] lg:right-[12%]", align: "right" },
  { id: "blog", title: "Blog", desc: "Notes & research", action: "READ LATEST", position: "top-[45%] right-[10%] lg:right-[12%]", align: "right" },
  { id: "contact", title: "Contact", desc: "Get in touch", action: "CONTACT US", position: "top-[65%] right-[10%] lg:right-[12%]", align: "right" },
];

export default function ExploreSection({ scrollProgress }: ExploreSectionProps) {
  const opacity = useTransform(scrollProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);
  const y = useTransform(scrollProgress, [0.85, 0.90, 1, 1], [50, 0, 0, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 w-full h-full pointer-events-none z-20 ">

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        <span className="w-8 h-[1px] bg-green-500/50" />
        Explore the Orizon Ecosystem
        <span className="w-8 h-[1px] bg-green-500/50" />
      </div>

      {EXPLORE_LINKS.map((link, i) => (
        <div 
          key={link.id} 
          className={`absolute ${link.position} pointer-events-auto group`}
        >
          <div className={`w-[280px] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 group-hover:border-green-500/40 transition-colors duration-500 z-10 relative`}>
            
            <div className={`flex items-center gap-3 ${link.align === "left" ? "flex-row" : "flex-row-reverse"}`}>
              <h3 className="text-white text-xl font-sans font-medium tracking-wide">{link.title}</h3>
              <svg className="w-4 h-4 text-green-500 shrink-0 group-hover:text-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>

            <p className={`text-gray-400 text-sm mt-1 font-sans ${link.align === "left" ? "text-left" : "text-right"}`}>
              {link.desc}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full text-center z-20">
        <p className="text-gray-400 font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll to dive in
        </p>
      </div>

    </motion.div>
  );
}