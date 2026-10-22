"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import PixelCard from "@/components/molecule/PixelCard";

interface EcosystemSectionProps {
  scrollProgress: MotionValue<number>;
}

// Hoisted outside component — allocated once, not per render
const START = 0.08;
const END = 0.32;
const OPACITY_RANGE: [number, number, number, number] = [
  START,
  START + 0.02,
  END - 0.02,
  END,
];
const OPACITY_VALUES: [number, number, number, number] = [0, 1, 1, 0];

const CARDS = [
  { num: "01", title: "Discover", desc: "Chart unknown sectors and identify deep-space anomalies in real-time.", align: "left",  position: "top-[25%] left-[12%] md:left-[15%] lg:left-[18%]",    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0 100%)" },
  { num: "02", title: "Verify",   desc: "Authenticate signals and validate telemetry across all active nodes.", align: "right", position: "top-[25%] right-[12%] md:right-[15%] lg:right-[18%]", clipPath: "polygon(0 0, 100% 0, 100% 100%, 35px 100%, 0 calc(100% - 35px))" },
  { num: "03", title: "Protect",  desc: "Shield critical infrastructure with zero-latency threat mitigation.",   align: "left",  position: "bottom-[25%] left-[12%] md:left-[15%] lg:left-[18%]", clipPath: "polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)" },
  { num: "04", title: "Automate", desc: "Deploy AI-driven defense protocols to neutralize threats autonomously.", align: "right", position: "bottom-[25%] right-[12%] md:right-[15%] lg:right-[18%]", clipPath: "polygon(35px 0, 100% 0, 100% 100%, 0 100%, 0 35px)" },
] as const;

const PIXEL_PROPS = {
  theme: "dark" as const,
  colors: ["#55ff55", "#44dd44"],
  gap: 6,
  speed: 40,
  pixelSize: 2,
  shape: "circle" as const,
  fade: 0.6,
  opacity: 0.8,
  trigger: "hover" as const,
  intro: false,
};

const PIXEL_CLASS =
  "w-full h-full !rounded-xl !shadow-none !bg-[#0a0a0a]/50 border border-white/10";

export default function EcosystemSection({ scrollProgress }: EcosystemSectionProps) {
  const opacity = useTransform(scrollProgress, OPACITY_RANGE, OPACITY_VALUES);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
    >
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-4 text-green-500 font-medium uppercase opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
        <span className="w-8 h-[1px] bg-green-500/50" />
        European Cybersecurity Ecosystem
        <span className="w-8 h-[1px] bg-green-500/50" />
      </div>

      {CARDS.map((card, i) => (
        <div
          key={i}
          className={`absolute ${card.position} w-[290px] h-[150px] pointer-events-auto group`}
        >
          <PixelCard
            {...PIXEL_PROPS}
            className={PIXEL_CLASS}
            style={{ clipPath: card.clipPath }}
          >
            <div className={`absolute inset-0 flex flex-col justify-center p-5 z-10 w-full ${card.align === "right" ? "items-end text-right magical-border-right" : "magical-border-left items-start text-left"}`}>
              <div className="flex items-center gap-1.5">
                <span className="text-[#44dd44] text-xl !font-semibold tracking-widest">{card.num}:</span>
                <h3 className="text-white text-2xl font-medium tracking-wide">{card.title}</h3>
              </div>
              <p className="text-sm !leading-snug">{card.desc}</p>
            </div>
          </PixelCard>
        </div>
      ))}

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl text-center pointer-events-auto">
        <h3 className="text-white !text-4xl">See every threat. Prove every<br />control. Sovereign by design.</h3>
      </div>
    </motion.div>
  );
}