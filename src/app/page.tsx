"use client";

import React, { useState } from "react";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import BlackHole, { BlackHoleSectionConfig } from "@/components/organism/BlackHole";
import SideNavigation from "@/components/molecule/SideNavigation";
import BottomHUD from "@/components/molecule/BottomHUD";
import HeroSection from "@/components/organism/sections/HeroSection";
import EcosystemSection from "@/components/organism/sections/EcosystemSection";
import KillChainSection from "@/components/organism/sections/KillChainSection";
import OneCoreSection from "@/components/organism/sections/OneCoreSection";
import ComparisonSection from "@/components/organism/sections/ComparisonSection";
import ServicesSection from "@/components/organism/sections/ServicesSection";
import ExploreSection from "@/components/organism/sections/ExploreSection";
import EmptyDiveSection from "@/components/organism/sections/EmptyDiveSection";
import ServicesGridSection from "@/components/organism/sections/simple/ServicesGridSection";
import NIS2Section from "@/components/organism/sections/simple/NIS2Section";
import ProcessStepsSection from "@/components/organism/sections/simple/ProcessStepsSection";
import WhyChooseOrizon from "@/components/organism/sections/simple/WhyChooseOrizon";
import InsightsSection from "@/components/organism/sections/simple/InsightsSection";


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
  
  useLenis(({ scroll }) => {
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1;
    const scrollMultiplier = 10; 
    const maxScrollDist = windowHeight * scrollMultiplier; 
    const normalizedProgress = Math.min(scroll / maxScrollDist, 1);
    smoothProgress.set(normalizedProgress);
    
    // UI updates only for the fixed scroll track
    const index = Math.min(Math.floor(scroll / (maxScrollDist / SECTIONS.length)), SECTIONS.length - 1);
    if (index !== activeIndex) setActiveIndex(index);
  });

  const springProgress = useSpring(smoothProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const progressValue = activeIndex / (SECTIONS.length - 1);

  // This controls when the fixed sections fade out to reveal the static content below
  // It fades from 0.90 to 0.95 progress (near the end of the scroll track)
  const fixedSectionsOpacity = useTransform(springProgress, [0.90, 0.95, 1], [1, 1, 0]);

  const blackHoleConfig: BlackHoleSectionConfig[] = [
    { section: 0, position: "center", preserveSize: true }, 
    { section: 1, position: "center", minScale: 0.8, maxScale: 1.2 }, 
    { section: 2, position: "center", scale: 0.9 }, 
    { section: 3, position: "top-right", minScale: 1.2, maxScale: 1.2 }, 
    { section: 4, position: "center", minScale: 1.0, maxScale: 1.3 }, 
    { section: 5, position: "center-left", minScale: 1, maxScale: 1 },
    { section: 6, position: "center", minScale: 1.0, maxScale: 1.0 },
    { section: 7, position: "center", minScale: 1.0, maxScale: 1.6 },
  ];

  return (
    <main className="relative w-full bg-[#050505]">
      
      {/* --- FIXED SCROLL SECTIONS (z-50 to z-0) --- */}
      {/* Wrapped in a motion.div that fades out as we approach the end of the scroll track */}
      <motion.div style={{ opacity: fixedSectionsOpacity }} className="fixed inset-0 z-50 pointer-events-none">
        
        <BlackHole scrollProgress={springProgress} sections={blackHoleConfig} />

        <div className="absolute inset-0 flex items-center justify-center">
          <HeroSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <EcosystemSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <KillChainSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <OneCoreSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ComparisonSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ServicesSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ExploreSection scrollProgress={springProgress} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <EmptyDiveSection />
        </div>

      </motion.div>

      {/* --- UI OVERLAYS (z-100) --- */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <SideNavigation sections={SECTIONS} activeIndex={activeIndex} />
        <BottomHUD stageText={SECTIONS[activeIndex].stage} progressValue={progressValue} />
      </div>

      {/* 
        --- SCROLL SPACER (Height for the fixed sections) ---
        This block takes up the physical scroll space for the 8 fixed sections.
        It must be tall enough to let the black hole complete its animation.
      */}
      <div className="h-[1000vh] pointer-events-none" />

      {/* 
        --- STATIC CONTENT SECTIONS (z-10) ---
        These appear AFTER the fixed sections fade out.
        They sit in normal document flow, so they naturally scroll up.
      */}
      <div className="relative z-10 bg-[#050505]">
        <NIS2Section />
        <ServicesGridSection />
        <WhyChooseOrizon />
        <ProcessStepsSection />
        <InsightsSection />
      </div>

    </main>
  );
}