import React from "react";

interface BottomHUDProps {
  stageText: string;
  progressValue: number; // Should be a number from 0 to 1
}

export default function BottomHUD({ stageText, progressValue }: BottomHUDProps) {
  // Format to 3 decimal places (e.g., 0.415)
  const formattedProgress = progressValue.toFixed(3);

  return (
    <div className="fixed bottom-12 left-10 flex flex-col gap-3 z-50 pointer-events-none font-mono text-[11px] tracking-[0.2em]">
      <div className="flex gap-8">
        <span className="text-green-600">STAGE</span>
        <span className="text-white">{stageText}</span>
      </div>
      <div className="flex gap-8 items-center">
        <span className="text-green-600">PROGRESS</span>
        <span className="text-white">{formattedProgress}</span>
      </div>
      <div className="w-64 h-1 bg-gray-800 mt-2 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progressValue * 100}%` }}
        />
      </div>
    </div>
  );
}