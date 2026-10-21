"use client";

import { useState } from "react";
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
import ServicesGridSection from "@/components/organism/sections/home/ServicesGridSection";
import NIS2Section from "@/components/organism/sections/simple/NIS2Section";
import ProcessStepsSection from "@/components/organism/sections/home/ProcessStepsSection";
import WhyChooseOrizon from "@/components/organism/sections/home/WhyChooseOrizon";
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
    // Reverted to standard 1000vh track (10 screens) for natural 1-scroll-per-section feel
    const maxScrollDist = windowHeight * 10; 
    const normalizedProgress = Math.min(scroll / maxScrollDist, 1);
    smoothProgress.set(normalizedProgress);
    
    // Calculate which section we are in
    const index = Math.min(Math.floor(scroll / (maxScrollDist / SECTIONS.length)), SECTIONS.length - 1);
    if (index !== activeIndex) setActiveIndex(index);
  });

  const springProgress = useSpring(smoothProgress, { stiffness: 60, damping: 35, restDelta: 0.001 });
  const progressValue = activeIndex / (SECTIONS.length - 1);

  const fixedSectionsOpacity = useTransform(springProgress, [0.90, 0.95, 1], [1, 1, 0]);

  const blackHoleConfig: BlackHoleSectionConfig[] = [
    // Hero: Normal size
    { section: 0, position: "center", minScale: 1.25, maxScale: 1.25, ringScale: 1 }, 
    
    // Ecosystem: Video shrinks (0.6), but Rings expand outwards (1.5)
    { section: 1, position: "center", minScale: 0.6, maxScale: 0.6, ringScale: 1.5 }, 
    
    // Stays at 0.6 for the rest of the fixed sections.
    
    // Section 2 (Kill Chain): Shrink to 0.9 for the layout.
    { section: 2, position: "center", scale: 0.9 }, 
    
    // Section 3 (One Core): Move to top-right.
    { section: 3, position: "top-right", minScale: 1.2, maxScale: 1.2 }, 
    
    // Section 4 (Comparison): Move center-left.
    { section: 4, position: "center-left", minScale: 1.0, maxScale: 1.3 }, 
    
    // Section 5 (Services): Move to center.
    { section: 5, position: "center", minScale: 1, maxScale: 1 },
    
    // Section 6 (Explore): Move to top-left.
    { section: 6, position: "top-left", minScale: 1.0, maxScale: 1.0 },
    
    // Section 7 (Dive): Return to center and scale up.
    { section: 7, position: "center", minScale: 1.0, maxScale: 1.6 },
  ];

  return (
    <main className="relative w-full bg-[#050505]">
      
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

      <div className="fixed inset-0 z-[100] pointer-events-none hidden">
        <SideNavigation sections={SECTIONS} activeIndex={activeIndex} />
        <BottomHUD stageText={SECTIONS[activeIndex].stage} progressValue={progressValue} />
      </div>

      {/* Reverted to 1000vh spacer */}
      <div className="h-[1000vh] pointer-events-none" />

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