"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05, // Lower means smoother/heavier (0.05 is buttery)
        smoothWheel: true,
        syncTouch: true, // Helps smooth out trackpad gestures
      }}
    >
      {children}
    </ReactLenis>
  );
}