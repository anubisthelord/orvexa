"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import PixelCard from "@/components/molecule/PixelCard";

interface EcosystemSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function EcosystemSection({ scrollProgress }: EcosystemSectionProps) {
  // Fades IN earlier (0.08) to overlap with the Hero fading out
  // Holds at 1 from 0.13 to 0.22
  const opacity = useTransform(scrollProgress, [0.08, 0.13, 0.22, 0.25], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.08, 0.13, 0.22, 0.25], [80, 0, 0, -80]);

  const cardOpacity2 = useTransform(scrollProgress, [0.09, 0.14, 0.22, 0.25], [0, 1, 1, 0]);
  const cardOpacity3 = useTransform(scrollProgress, [0.10, 0.15, 0.22, 0.25], [0, 1, 1, 0]);
  const cardOpacity4 = useTransform(scrollProgress, [0.11, 0.16, 0.22, 0.25], [0, 1, 1, 0]);

  const cardOpacities = [opacity, cardOpacity2, cardOpacity3, cardOpacity4];

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
      style={{ 
        opacity, 
        y, 
        willChange: "transform, opacity" // <--- CRITICAL FOR SMOOTHNESS
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    >
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-4 text-green-500 font-medium uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        <span className="w-8 h-[1px] bg-green-500/50" />
        European Cybersecurity Ecosystem
        <span className="w-8 h-[1px] bg-green-500/50" />
      </div>

      {cards.map((card, i) => (
        <motion.div
          key={i}
          style={{ 
            opacity: cardOpacities[i],
            willChange: "transform, opacity" // <--- CRITICAL FOR PIXEL CARD SMOOTHNESS
          }}
          className={`absolute ${card.position} w-[290px] h-[150px] pointer-events-auto group`}
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
            trigger="always" 
            intro={false} 
            className="w-full h-full !rounded-xl !shadow-none !bg-[#0a0a0a]/50 border border-white/10"
            style={{ clipPath: card.clipPath }}
          >
            <div className={`absolute inset-0 flex flex-col justify-center p-5 z-10 w-full ${card.align === "right" ? "items-end text-right magical-border-right" : "magical-border-left items-start text-left"}`}>
              <div className={`flex items-center gap-1.5`}>
                <span className="text-[#44dd44] text-xl !font-semibold tracking-widest">
                  {card.num}:
                </span>
                <h3 className="text-white text-2xl font-medium tracking-wide drop-shadow-md">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm !leading-snug">
                {card.desc}
              </p>
            </div>
          </PixelCard>
        </motion.div>
      ))}

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl text-center pointer-events-auto">
        <h3 className="text-white !text-4xl">
          See every threat. Prove every<br />
          control. Sovereign by design.
        </h3>
      </div>
    </motion.div>
  );
}