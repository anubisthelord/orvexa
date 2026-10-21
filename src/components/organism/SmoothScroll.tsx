"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // Keep your smoothness
        smoothWheel: true,
        // Let Lenis handle its own requestAnimationFrame natively
      }}
    >
      {children}
    </ReactLenis>
  );
}