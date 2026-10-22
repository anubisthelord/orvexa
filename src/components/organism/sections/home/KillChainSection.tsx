"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";
import {
  HiOutlineRocketLaunch, HiOutlineGlobeAlt, HiOutlineArrowTrendingUp,
  HiOutlineSignal, HiOutlineMoon, HiOutlineArrowDown, HiOutlineServerStack,
} from "react-icons/hi2";

interface KillChainSectionProps {
  scrollProgress: MotionValue<number>;
}

// Hoisted constants — allocated once per module, not per render
const START = 0.32;
const END = 0.5;
const OPACITY_RANGE: [number, number, number, number] = [
  START, START + 0.06, END - 0.06, END,
];
const OPACITY_VALUES: [number, number, number, number] = [0, 1, 1, 0];
const OPACITY_OPTS = { clamp: true } as const;

const STYLES = {
  root: { opacity: undefined as unknown as MotionValue<number>, contain: "layout paint" as const },
};

const STAGES = [
  { title: "Launch & Ascent",       desc: "Ignition sequence begins. The vehicle pushes through max-Q, shedding solid boosters and aligning for orbital insertion.", Icon: HiOutlineRocketLaunch },
  { title: "Orbit Insertion",       desc: "The main engine cuts off. The payload separates from the fairing and successfully enters low Earth orbit.",              Icon: HiOutlineGlobeAlt },
  { title: "Trans-Lunar Injection", desc: "A critical burn sets the spacecraft on a precise trajectory toward the lunar south pole, escaping Earth's gravity well.",  Icon: HiOutlineArrowTrendingUp },
  { title: "Deep Space Cruise",     desc: "Days of coasting. Solar arrays deploy, deep-space communications lock on, and navigation systems calibrate for lunar approach.", Icon: HiOutlineSignal },
  { title: "Lunar Orbit Capture",   desc: "The retro-burn slows the craft down, allowing the Moon's gravity to pull it into a stable, highly elliptical polar orbit.", Icon: HiOutlineMoon },
  { title: "Powered Descent",       desc: "The lander separates. Autonomous thrusters fire for the final 10 kilometers, scanning the surface for a safe landing zone.", Icon: HiOutlineArrowDown },
  { title: "Surface Operations",    desc: "Touchdown confirmed. The rover deploys, solar panels unfurl, and the first scientific telemetry begins transmitting to Earth.", Icon: HiOutlineServerStack },
] as const;

export default function KillChainSection({ scrollProgress }: KillChainSectionProps) {
  const opacity = useTransform(scrollProgress, OPACITY_RANGE, OPACITY_VALUES, OPACITY_OPTS);

  return (
    <motion.div
      style={{ opacity, contain: "layout paint" }}
      className="relative pointer-events-auto z-30 flex flex-col items-center border-dashed w-full h-full mx-auto justify-center gap-12 isolate"
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
        <div className="grid grid-cols-7 gap-5 w-full items-stretch">
          {STAGES.map(({ title, desc, Icon }, i) => {
            const isDown = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`relative flex flex-col items-center w-full ${isDown ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`bg-bg/95 border border-border p-2.5 !py-5 rounded flex flex-col items-center text-center w-full z-10 ${isDown ? "order-3 magical-border-left mt-4" : "order-1 magical-border-right mb-4"}`}
                >
                  <span className="text-xl mb-3 border border-border rounded p-1">
                    <Icon />
                  </span>
                  <h3 className="mb-1 !text-lg">{title}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
                <div className="w-[1px] h-8 bg-gray-700/50 z-0 order-2" />
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