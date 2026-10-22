"use client";

import { useEffect, useRef, useState } from "react";

interface SmoothnessMonitorProps {
  /** Update interval in ms (default 500) */
  interval?: number;
  /** Size of the pill (default "md") */
  size?: "sm" | "md" | "lg";
  /** Show the raw frame + scroll sub-scores */
  showBreakdown?: boolean;
}

type Metrics = {
  score: number;        // 0–100 blended
  fpsScore: number;     // 0–100
  scrollScore: number;  // 0–100
  fps: number;          // actual measured fps
  jankyFrames: number;  // frames over budget
  totalFrames: number;
};

const GRADE = (score: number) => {
  if (score >= 90) return { label: "Excellent", color: "#22c55e" };
  if (score >= 75) return { label: "Good",      color: "#84cc16" };
  if (score >= 55) return { label: "Fair",      color: "#eab308" };
  if (score >= 35) return { label: "Jerky",     color: "#f97316" };
  return                   { label: "Bad",       color: "#ef4444" };
};

export default function SmoothnessMonitor({
  interval = 500,
  size = "md",
  showBreakdown = true,
}: SmoothnessMonitorProps) {
  const [metrics, setMetrics] = useState<Metrics>({
    score: 100, fpsScore: 100, scrollScore: 100,
    fps: 60, jankyFrames: 0, totalFrames: 0,
  });

  const frameTimesRef = useRef<number[]>([]);
  const scrollDeltasRef = useRef<number[]>([]);
  const lastFrameRef = useRef<number>(performance.now());
  const lastScrollRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastEmitRef = useRef<number>(0);

  // Target frame time from actual display refresh rate
  const targetFrameMs = useRef(1000 / 60);
  useEffect(() => {
    // Detect actual refresh rate by sampling the first ~20 frames
    const samples: number[] = [];
    let last = performance.now();
    let count = 0;
    const detect = (t: number) => {
      const dt = t - last;
      last = t;
      if (dt > 0 && dt < 100) samples.push(dt);
      if (++count < 20) requestAnimationFrame(detect);
      else {
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        targetFrameMs.current = avg;
      }
    };
    requestAnimationFrame(detect);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const delta = Math.abs(window.scrollY - lastScrollRef.current);
      lastScrollRef.current = window.scrollY;
      // Only record deltas while actively scrolling (ignore idle)
      if (delta > 0) scrollDeltasRef.current.push(delta);
      // Cap the buffer so memory stays bounded
      if (scrollDeltasRef.current.length > 120) {
        scrollDeltasRef.current.shift();
      }
      lastFrameRef.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (t: number) => {
      const dt = t - lastFrameRef.current;
      lastFrameRef.current = t;

      // Ignore absurd deltas (tab was backgrounded)
      if (dt > 0 && dt < 200) {
        frameTimesRef.current.push(dt);
        if (frameTimesRef.current.length > 120) frameTimesRef.current.shift();
      }

      // Emit every `interval` ms
      if (t - lastEmitRef.current >= interval) {
        lastEmitRef.current = t;

        const frameTimes = frameTimesRef.current;
        const target = targetFrameMs.current;

        // ── Frame score ──────────────────────────────────────────
        let fpsScore = 100;
        let fps = 60;
        let janky = 0;
        if (frameTimes.length > 0) {
          const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
          fps = 1000 / Math.max(avg, 0.001);
          // Frames more than 1.5x the target are "janky"
          janky = frameTimes.filter((ft) => ft > target * 1.5).length;
          const jankRatio = janky / frameTimes.length;
          // Penalize based on how far below target fps we are
          const fpsRatio = Math.min(fps / (1000 / target), 1);
          fpsScore = Math.round((fpsRatio * 0.5 + (1 - jankRatio) * 0.5) * 100);
        }

        // ── Scroll consistency score ─────────────────────────────
        let scrollScore = 100;
        const deltas = scrollDeltasRef.current;
        if (deltas.length > 3) {
          const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
          const variance =
            deltas.reduce((a, b) => a + (b - mean) ** 2, 0) / deltas.length;
          const stdDev = Math.sqrt(variance);
          // Coefficient of variation: low = smooth, high = jerky
          const cv = mean > 0 ? stdDev / mean : 0;
          // Map CV 0→0.8 to score 100→0
          scrollScore = Math.round(Math.max(0, Math.min(100, 100 - cv * 125)));
        }

        // ── Blend ────────────────────────────────────────────────
        const score = Math.round(fpsScore * 0.6 + scrollScore * 0.4);

        setMetrics({
          score,
          fpsScore,
          scrollScore,
          fps: Math.round(fps),
          jankyFrames: janky,
          totalFrames: frameTimes.length,
        });

        // Reset windows so we measure fresh data each interval
        frameTimesRef.current = [];
        scrollDeltasRef.current = [];
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [interval]);

  const grade = GRADE(metrics.score);
  const pad = size === "sm" ? "px-2 py-1" : size === "lg" ? "px-4 py-3" : "px-3 py-2";
  const numSize = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div
      className={`fixed bottom-4 left-4 z-[9999] pointer-events-none select-none font-mono ${pad} rounded-lg border border-white/10 bg-black/75 backdrop-blur-md text-white shadow-xl`}
      style={{ minWidth: 160 }}
      aria-live="polite"
    >
      <div className="flex items-baseline gap-1">
        <span
          className={`${numSize} font-bold tabular-nums`}
          style={{ color: grade.color }}
        >
          {metrics.score}%
        </span>
        <span className="text-[10px] uppercase tracking-wider opacity-60">
          {grade.label}
        </span>
      </div>

      {showBreakdown && (
        <div className="mt-1 space-y-0.5 text-[10px] tabular-nums">
          <Bar label="FRM" value={metrics.fpsScore} hint={`${metrics.fps}fps`} />
          <Bar label="SCR" value={metrics.scrollScore} />
          {metrics.jankyFrames > 0 && (
            <div className="text-[9px] text-orange-400/80">
              {metrics.jankyFrames}/{metrics.totalFrames} janky frames
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Bar({ label, value, hint }: { label: string; value: number; hint?: string }) {
  const color = GRADE(value).color;
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-7 opacity-50">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-7 text-right opacity-70">
        {hint ?? `${value}%`}
      </span>
    </div>
  );
}