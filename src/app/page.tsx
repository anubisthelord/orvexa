"use client";

import { useState } from "react";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import BlackHole, { BlackHoleSectionConfig } from "@/components/organism/BlackHole";
import Starfield3D from "@/components/organism/sections/simple/Starfield3D";
import SideNavigation from "@/components/molecule/SideNavigation";
import BottomHUD from "@/components/molecule/BottomHUD";
import HeroSection from "@/components/organism/sections/HeroSection";
import EcosystemSection from "@/components/organism/sections/EcosystemSection";
import KillChainSection from "@/components/organism/sections/KillChainSection";
import OneCoreSection from "@/components/organism/sections/OneCoreSection";
import ComparisonSection from "@/components/organism/sections/ComparisonSection";
import ServicesSection from "@/components/organism/sections/ServicesSection";
import ExploreSection from "@/components/organism/sections/ExploreSection";
import ServicesGridSection from "@/components/organism/sections/home/ServicesGridSection";
import NIS2Section from "@/components/organism/sections/simple/NIS2Section";
import ProcessStepsSection from "@/components/organism/sections/home/ProcessStepsSection";
import WhyChooseOrizon from "@/components/organism/sections/home/WhyChooseOrizon";
import InsightsSection from "@/components/organism/sections/simple/InsightsSection";
import SmoothnessMonitor from "@/components/organism/sections/simple/SmoothnessMonitor";

const SECTIONS = [
  { id: "start", label: "START", stage: "01 STAY RESILIENT" },
  { id: "ecosystem", label: "ECOSYSTEM", stage: "02 WELCOME TO ORION" },
  { id: "kill-chain", label: "KILL CHAIN", stage: "03 DEFENSE PROTOCOLS" },
  { id: "one-core", label: "ONE CORE", stage: "04 CENTRAL NEXUS" },
  { id: "compare", label: "COMPARE", stage: "05 THE COMPARISON" },
  { id: "services", label: "SERVICES", stage: "06 DEPLOYMENT" },
  { id: "explore", label: "EXPLORE", stage: "07 THE ECOSYSTEM" },
  { id: "dive", label: "DIVE", stage: "08 DEEP DIVE" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const smoothProgress = useMotionValue(0);
  const staticOpacity = useMotionValue(0.89); 

  useLenis(({ scroll }) => {
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1;
    const maxScrollDist = windowHeight * 10; 
    const normalizedProgress = Math.min(scroll / maxScrollDist, 1);
    smoothProgress.set(normalizedProgress);
    
    const index = Math.min(Math.floor(scroll / (maxScrollDist / SECTIONS.length)), SECTIONS.length - 1);
    if (index !== activeIndex) setActiveIndex(index);
  });

  const springProgress = useSpring(smoothProgress, { stiffness: 60, damping: 35, restDelta: 0.001 });

  const progressValue = activeIndex / (SECTIONS.length - 1);
  
  // The UI scene fades out at the very end to reveal the real HTML page below
  const sceneOpacity = useTransform(springProgress, [0, 0.98, 1.0], [1, 1, 0]);

  const SNAP = 0.04;     

  const blackHoleConfig: BlackHoleSectionConfig[] = [
    { section: 0, position: "center", minScale: 1.25, maxScale: 1.25, ringScale: 1, hold: 1, snapDuration: 0, noTop: false }, 
    { section: 1, position: "center", minScale: 0.6, maxScale: 0.6, ringScale: 1.5, hold: 0.8, snapDuration: SNAP, noTop: false }, 
    { section: 2, position: "center", scale: 0.6, hold: 0.85, snapDuration: 0.05, noTop: false }, 
    { section: 3, position: "center", minScale: 0.8, maxScale: 0.8, hold: 0.85, snapDuration: 0.05, noTop: true }, 
    { section: 4, position: "center-right", minScale: 1.1, maxScale: 1.1, hold: 0.8, snapDuration: SNAP, noTop: true }, 
    { section: 5, position: "center", minScale: 1.0, maxScale: 1.3, hold: 0.8, snapDuration: SNAP, noTop: true }, 
    { section: 6, position: "center-left", minScale: 1.0, maxScale: 1.1, hold: 0.8, snapDuration: SNAP, noTop: true }, 
    { section: 7, position: "center", minScale: 1.0, maxScale: 1.6, snapDuration: SNAP, noTop: true }, 
  ];

  const sceneY = useTransform(
    springProgress, 
    [
      0,    0.08, 
      0.08, 0.12, 0.24, 0.32,   
      0.32, 0.36, 0.48, 0.52,   
      0.52, 0.56, 0.64, 0.68,   
      0.68, 0.72, 0.78, 0.82,   
      0.82, 1.0                 
    ],
    [
      "0vh","0vh", 
      "0vh","0vh","0vh","-100vh", 
      "100vh","0vh","0vh","-100vh", 
      "100vh","0vh","0vh","-100vh", 
      "100vh","0vh","0vh","-100vh",
      "-100vh","-100vh"
    ]
  );

  // --- Config-aware black hole Y ---
  // A -50vh dip is suppressed ONLY when the section it lands in has noTop: true.
  // Non-noTop sections keep their full "go top half" motion, so the feature stays intact.
  const RAW_Y_INPUTS  = [
    0,     0.08,
    0.08,  0.22,  0.26,  0.32,
    0.32,  0.36,  0.54,  0.58,  0.66,
    0.66,  0.70,  0.82,  0.86,
    0.86,  1.0
  ];
  const RAW_Y_OUTPUTS = [
    "0vh", "0vh",
    "0vh", "0vh", "-50vh", "0vh",
    "0vh", "0vh", "0vh", "-50vh", "0vh",
    "0vh", "0vh", "-50vh", "0vh",
    "0vh", "0vh"
  ];

  const resolvedYOutputs = RAW_Y_OUTPUTS.map((v, idx) => {
    if (v === "0vh") return v;
    const p = RAW_Y_INPUTS[idx];
    const total = blackHoleConfig.length;
    const cur = Math.min(Math.round(p * (total - 1)), total - 1);
    // Suppress the dip only if the section this keyframe belongs to is noTop.
    return blackHoleConfig[cur]?.noTop ? "0vh" : v;
  });

  const rawBlackHoleY = useTransform(springProgress, RAW_Y_INPUTS, resolvedYOutputs);

  const blackHoleY = useSpring(rawBlackHoleY, { stiffness: 90, damping: 25 });

  return (
    <main className="relative w-full bg-[#050505]">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield3D opacity={staticOpacity} />
      </div>

      <div className="sticky top-0 w-full h-[100vh] overflow-hidden z-50">
        
        {/* Black Hole Container - No opacity fades, stays fully visible */}
        <motion.div 
          style={{ 
            y: blackHoleY
          }} 
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <BlackHole scrollProgress={springProgress} sections={blackHoleConfig} />
        </motion.div>

        {/* Scene Y Sections (Hero -> Services) */}
        <motion.div 
          style={{ opacity: sceneOpacity, y: sceneY }} 
          className="absolute inset-0 pointer-events-none bg-transparent"
        >
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <HeroSection scrollProgress={springProgress} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <EcosystemSection scrollProgress={springProgress} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <KillChainSection scrollProgress={springProgress} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <OneCoreSection scrollProgress={springProgress} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <ServicesSection scrollProgress={springProgress} />
          </div>
        </motion.div>

        {/* Self-animated Sections (Comparison & Explore) */}
        <div className="absolute inset-0 pointer-events-none">
          <ComparisonSection scrollProgress={springProgress} />
          <ExploreSection scrollProgress={springProgress} />
        </div>

      </div>

      <div className="fixed inset-0 z-[100] pointer-events-none hidden">
        <SideNavigation sections={SECTIONS} activeIndex={activeIndex} />
        <BottomHUD stageText={SECTIONS[activeIndex].stage} progressValue={progressValue} />
      </div>

      <div className="h-[1200vh] pointer-events-none" />

      <div className="relative z-1000 bg-[#050505]">
        <NIS2Section />
        <ServicesGridSection />
        <WhyChooseOrizon />
        <ProcessStepsSection />
        <InsightsSection />
      </div>
      <SmoothnessMonitor size="md" interval={500} showBreakdown />
    </main>
  );
}