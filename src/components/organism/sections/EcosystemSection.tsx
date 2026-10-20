"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import PixelCard from "@/components/molecule/PixelCard";

interface EcosystemSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function EcosystemSection({ scrollProgress }: EcosystemSectionProps) {
// Fades IN from 0.10 -> 0.20
// Fades OUT from 0.28 -> 0.30
const opacity = useTransform(scrollProgress, [0.10, 0.20, 0.28, 0.30], [0, 1, 1, 0]);
const y = useTransform(scrollProgress, [0.10, 0.20, 0.28, 0.30], [50, 0, 0, -50]);

  const cards = [
    {
      num: "01",
      title: "Discover",
      desc: "Chart unknown sectors and identify deep-space anomalies in real-time.",
      align: "left",
      position: "top-[25%] left-[12%] md:left-[15%] lg:left-[18%]",
      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0 100%)",
    },
    {
      num: "02",
      title: "Verify",
      desc: "Authenticate signals and validate telemetry across all active nodes.",
      align: "right",
      position: "top-[25%] right-[12%] md:right-[15%] lg:right-[18%]",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 35px 100%, 0 calc(100% - 35px))",
    },
    {
      num: "03",
      title: "Protect",
      desc: "Shield critical infrastructure with zero-latency threat mitigation.",
      align: "left",
      position: "bottom-[25%] left-[12%] md:left-[15%] lg:left-[18%]",
      clipPath: "polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)",
    },
    {
      num: "04",
      title: "Automate",
      desc: "Deploy AI-driven defense protocols to neutralize threats autonomously.",
      align: "right",
      position: "bottom-[25%] right-[12%] md:right-[15%] lg:right-[18%]",
      clipPath: "polygon(35px 0, 100% 0, 100% 100%, 0 100%, 0 35px)",
    },
  ];

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    >
      {/* Top Center Subtitle */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-4 text-green-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        <span className="w-8 h-[1px] bg-green-500/50" />
        European Cybersecurity Ecosystem
        <span className="w-8 h-[1px] bg-green-500/50" />
      </div>

      {/* Floating Cards */}
      {cards.map((card, i) => (
        <div
          key={i}
          // pointer-events-auto is crucial here so the mouse can actually hover the card
          className={`absolute ${card.position} w-[290px] h-[150px] pointer-events-auto group`}
        >
          <div 
            className="w-full h-full relative"
            style={{ clipPath: card.clipPath }}
          >
            <PixelCard
              theme="dark"
              colors={["#55ff55", "#44dd44"]}
              gap={6}
              speed={40}
              pixelSize={2}
              shape="circle"
              fade={0.6}
              opacity={0.8}
              // CHANGED TO HOVER: Activates only when the mouse enters the card
              trigger="hover" 
              intro={false} // Disable the automatic intro wave
              className="w-full h-full !rounded-none !shadow-none !bg-transparent"
            >
              {/* SIMPLE CONTENT LAYOUT */}
              <div className={`absolute inset-0 flex flex-col justify-center p-5 z-10 w-full ${card.align === "right" ? "items-end text-right" : "items-start text-left"}`}>
                
                {/* Header Row (Number & Title) */}
                <div className={`flex gap-2 items-center mb-1 ${card.align === "right" ? "flex-row-reverse" : ""}`}>
                  <span className="text-[#44dd44] text-2xl font-medium tracking-widest">
                    {card.num} :
                  </span>
                  <h2 className="text-white text-2xl font-medium tracking-wide drop-shadow-md">
                    {card.title}
                  </h2>
                </div>

                {/* Paragraph Description */}
                <p className="text-gray-400 font-sans text-sm leading-snug">
                  {card.desc}
                </p>

              </div>
            </PixelCard>
          </div>

          {/* BORDER LAYER */}
          <div 
            className="absolute inset-0 border border-green-500/30 pointer-events-none transition-colors duration-300 group-hover:border-green-500/60"
            style={{ clipPath: card.clipPath }}
          >
             <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(85,255,85,0.1)] pointer-events-none group-hover:shadow-[inset_0_0_30px_rgba(85,255,85,0.2)] transition-shadow duration-300" />
          </div>

        </div>
      ))}

      {/* Bottom Center Text */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl text-center">
        <h3 className="text-white text-3xl md:text-4xl font-sans font-semibold leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          See every threat. Prove every<br />
          control. Sovereign by design.
        </h3>
      </div>
    </motion.div>
  );
}