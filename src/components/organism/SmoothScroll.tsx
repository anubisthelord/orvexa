"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // 1. We disable Lenis's internal loop (autoRaf: false) in the component below.
    // 2. We manually drive Lenis using Framer Motion's frame loop.
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.setup(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef} 
      options={{ 
        autoRaf: false, // Critical: Disable Lenis's own loop
        lerp: 0.08, 
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}