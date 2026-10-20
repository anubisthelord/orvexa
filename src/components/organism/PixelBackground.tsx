"use client";

import React, { useEffect, useRef, useState } from "react";

export interface PixelBackgroundProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  pixelSize?: number;
  shape?: "square" | "circle" | "diamond";
  opacity?: number;
  fade?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelBackground({
  colors = ["#ffffff", "#e0f2fe", "#fef08a"],
  gap = 25, // INCREASED gap to reduce particle count from 32,000 to ~3,000
  speed = 35,
  pixelSize = 2,
  shape = "circle",
  opacity = 0.8,
  fade = 0.8,
  className = "",
  style,
}: PixelBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;

    // Particle Data
    let count = 0;
    let pX: Float32Array, pY: Float32Array, pSize: Float32Array, pPhase: Float32Array, pSpeed: Float32Array, pColor: string[];

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      count = cols * rows;

      pX = new Float32Array(count);
      pY = new Float32Array(count);
      pSize = new Float32Array(count);
      pPhase = new Float32Array(count);
      pSpeed = new Float32Array(count);
      pColor = new Array(count);

      let i = 0;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          pX[i] = offsetX + col * gap;
          pY[i] = offsetY + row * gap;
          pSize[i] = Math.random() * pixelSize + 0.5;
          pPhase[i] = Math.random() * Math.PI * 2;
          pSpeed[i] = Math.random() * 1.5 + 0.5;
          pColor[i] = colors[Math.floor(Math.random() * colors.length)];
          i++;
        }
      }
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Ghost mouse calculation (smooth Lissajous curve)
      const t = time * 0.5;
      const mouseX = width / 2 + Math.sin(t) * (width * 0.35);
      const mouseY = height / 2 + Math.cos(t * 0.8) * (height * 0.35);
      const hoverRadius = 250;

      // 1. Draw the background glow following the ghost mouse
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, hoverRadius * 1.5);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0.08)`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Particles
      for (let i = 0; i < count; i++) {
        const x = pX[i];
        const y = pY[i];
        
        // Calculate distance to ghost mouse for the spotlight effect
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy); // Math.sqrt is faster than Math.hypot
        const inSpotlight = Math.max(0, 1 - dist / hoverRadius);

        // Twinkle animation
        const twinkle = Math.sin(time * pSpeed[i] + pPhase[i]) * 0.5 + 0.5;
        
        // Combine effects
        const sizeMultiplier = 1 + inSpotlight * 4;
        const alphaMultiplier = (0.2 + twinkle * 0.8 + inSpotlight * 0.8) * opacity;

        // Edge fade calculation
        const edgeFade = Math.min(
          Math.min(x, width - x) / (width * 0.15),
          Math.min(y, height - y) / (height * 0.15)
        );
        const finalAlpha = Math.min(1, alphaMultiplier * edgeFade);

        if (finalAlpha <= 0.01) continue;

        ctx.globalAlpha = finalAlpha;
        ctx.fillStyle = pColor[i];
        
        if (shape === "circle") {
          ctx.beginPath();
          ctx.arc(x, y, (pSize[i] * sizeMultiplier) / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const s = pSize[i] * sizeMultiplier;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    init();
    render();

    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [colors, gap, speed, pixelSize, shape, opacity, fade]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block" />
    </div>
  );
}