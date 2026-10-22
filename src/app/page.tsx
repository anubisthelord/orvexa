
"use client";

import { useState } from "react";
import {
  useMotionValue,
  useSpring,
  motion,
  useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";

import BlackHole, {
  type BlackHoleSectionConfig,
} from "@/components/organism/BlackHole";
import Starfield3D from "@/components/organism/sections/simple/Starfield3D";
import SideNavigation from "@/components/molecule/SideNavigation";
import BottomHUD from "@/components/molecule/BottomHUD";

import ServicesGridSection from "@/components/organism/sections/home/ServicesGridSection";
import NIS2Section from "@/components/organism/sections/simple/NIS2Section";
import ProcessStepsSection from "@/components/organism/sections/home/ProcessStepsSection";
import WhyChooseOrizon from "@/components/organism/sections/home/WhyChooseOrizon";
import InsightsSection from "@/components/organism/sections/simple/InsightsSection";
import SmoothnessMonitor from "@/components/organism/sections/simple/SmoothnessMonitor";
import HeroSection from "@/components/organism/sections/home/HeroSection";
import ComparisonSection from "@/components/organism/sections/home/ComparisonSection";
import EcosystemSection from "@/components/organism/sections/home/EcosystemSection";
import ExploreSection from "@/components/organism/sections/home/ExploreSection";
import KillChainSection from "@/components/organism/sections/home/KillChainSection";
import OneCoreSection from "@/components/organism/sections/home/OneCoreSection";
import ServicesSection from "@/components/organism/sections/home/ServicesSection";

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

const SNAP = 0.04;

const BLACK_HOLE_CONFIG: BlackHoleSectionConfig[] = [
  {
    section: 0,
    position: "center",
    minScale: 1.25,
    maxScale: 1.25,
    ringScale: 1,
    hold: 1,
    snapDuration: 0,
    noTop: false,
  },
  {
    section: 1,
    position: "center",
    minScale: 0.6,
    maxScale: 0.6,
    ringScale: 1.5,
    hold: 0.8,
    snapDuration: SNAP,
    noTop: false,
  },
  {
    section: 2,
    position: "center",
    scale: 0.6,
    hold: 0.85,
    snapDuration: 0.05,
    noTop: false,
  },
  {
    section: 3,
    position: "center",
    minScale: 0.8,
    maxScale: 0.8,
    hold: 0.85,
    snapDuration: 0.05,
    noTop: true,
  },
  {
    section: 4,
    position: "center-right",
    minScale: 1.1,
    maxScale: 1.1,
    hold: 0.8,
    snapDuration: SNAP,
    noTop: true,
  },
  {
    section: 5,
    position: "center",
    minScale: 1.0,
    maxScale: 1.3,
    hold: 0.8,
    snapDuration: SNAP,
    noTop: true,
  },
  {
    section: 6,
    position: "center-left",
    minScale: 1.0,
    maxScale: 1.1,
    hold: 0.8,
    snapDuration: SNAP,
    noTop: true,
  },
  {
    section: 7,
    position: "center",
    minScale: 1.0,
    maxScale: 1.6,
    snapDuration: SNAP,
    noTop: true,
  },
];

const SCENE_Y_INPUTS = [
  0, 0.08,
  0.08, 0.12, 0.24, 0.32,
  0.32, 0.36, 0.48, 0.52,
  0.52, 0.56, 0.64, 0.68,
  0.68, 0.72, 0.78, 0.82,
  0.82, 1.0,
];

const SCENE_Y_OUTPUTS = [
  "0vh", "0vh",
  "0vh", "0vh", "0vh", "-100vh",
  "100vh", "0vh", "0vh", "-100vh",
  "100vh", "0vh", "0vh", "-100vh",
  "100vh", "0vh", "0vh", "-100vh",
  "-100vh", "-100vh",
];

const RAW_Y_INPUTS = [
  0, 0.08,
  0.08, 0.22, 0.26, 0.32,
  0.32, 0.36, 0.54, 0.58, 0.66,
  0.66, 0.70, 0.82, 0.86,
  0.86, 1.0,
];

const RAW_Y_OUTPUTS = [
  "0vh", "0vh",
  "0vh", "0vh", "-50vh", "0vh",
  "0vh", "0vh", "0vh", "-50vh", "0vh",
  "0vh", "0vh", "-50vh", "0vh",
  "0vh", "0vh",
];

const RESOLVED_Y_OUTPUTS = RAW_Y_OUTPUTS.map((value, index) => {
  if (value === "0vh") return value;

  const progress = RAW_Y_INPUTS[index];
  const sectionIndex = Math.min(
    Math.round(progress * (BLACK_HOLE_CONFIG.length - 1)),
    BLACK_HOLE_CONFIG.length - 1
  );

  // Preserve the original rule: noTop sections suppress the -50vh dip.
  return BLACK_HOLE_CONFIG[sectionIndex]?.noTop ? "0vh" : value;
});

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const smoothProgress = useMotionValue(0);
  const staticOpacity = useMotionValue(0.89);

  // Lenis should be initialized once by your existing root provider.
  // This callback only reads its scroll position.
  useLenis(({ scroll }) => {
    const maxScrollDist = Math.max(
      (typeof window !== "undefined" ? window.innerHeight : 1) * 10,
      1
    );

    const normalizedProgress = Math.max(
      0,
      Math.min(scroll / maxScrollDist, 1)
    );

    smoothProgress.set(normalizedProgress);

    const index = Math.min(
      Math.floor(normalizedProgress * SECTIONS.length),
      SECTIONS.length - 1
    );

    setActiveIndex((current) => (current === index ? current : index));
  });

  // One spring controls the cinematic timeline.
  const springProgress = useSpring(smoothProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressValue = activeIndex / (SECTIONS.length - 1);

  // Fade the cinematic scene at the end to reveal the HTML sections.
  const sceneOpacity = useTransform(
    springProgress,
    [0, 0.98, 1],
    [1, 1, 0]
  );

  const sceneY = useTransform(
    springProgress,
    SCENE_Y_INPUTS,
    SCENE_Y_OUTPUTS
  );

  // Avoid a second spring: this value already follows springProgress.
  const blackHoleY = useTransform(
    springProgress,
    RAW_Y_INPUTS,
    RESOLVED_Y_OUTPUTS
  );

  return (
    <main className="relative w-full bg-[#050505]">
      {/* Persistent starfield background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield3D opacity={staticOpacity} />
      </div>

      {/* Cinematic viewport */}
      <div className="sticky top-0 z-50 h-screen w-full overflow-hidden">
        {/* Black Hole stays visible throughout the cinematic scene */}
        <motion.div
          style={{ y: blackHoleY }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <BlackHole
            scrollProgress={springProgress}
            sections={BLACK_HOLE_CONFIG}
          />
        </motion.div>

        {/* Main scene transitions */}
        <motion.div
          style={{ opacity: sceneOpacity, y: sceneY }}
          className="pointer-events-none absolute inset-0 bg-transparent"
        >
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <HeroSection scrollProgress={springProgress} />
          </div>

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <EcosystemSection scrollProgress={springProgress} />
          </div>

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <KillChainSection scrollProgress={springProgress} />
          </div>

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <OneCoreSection scrollProgress={springProgress} />
          </div>

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <ServicesSection scrollProgress={springProgress} />
          </div>
        </motion.div>

        {/* Self-animated sections */}
        <div className="pointer-events-none absolute inset-0">
          <ComparisonSection scrollProgress={springProgress} />
          <ExploreSection scrollProgress={springProgress} />
        </div>
      </div>

      {/* Existing navigation and HUD, kept hidden as before */}
      <div className="fixed inset-0 z-[100] hidden pointer-events-none">
        <SideNavigation
          sections={SECTIONS}
          activeIndex={activeIndex}
        />
        <BottomHUD
          stageText={SECTIONS[activeIndex].stage}
          progressValue={progressValue}
        />
      </div>

      {/* Preserve the original cinematic scroll length */}
      <div className="h-[1200vh] pointer-events-none" />

      {/* Normal HTML content after the cinematic scene */}
      <div className="relative z-[1000] bg-[#050505]">
        <NIS2Section />
        <ServicesGridSection />
        <WhyChooseOrizon />
        <ProcessStepsSection />
        <InsightsSection />
      </div>

      <SmoothnessMonitor
        size="md"
        interval={500}
        showBreakdown
      />
    </main>
  );
}
