"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

interface ComparisonSectionProps {
  scrollProgress: MotionValue<number>;
}

// 1. Strict Type for Data
type TableRow = {
  dimension: string;
  orizon: string;
  vendors: string;
  inhouse: string;
  highlight?: boolean;
};

// 2. Static Data Outside Component
const TABLE_DATA: TableRow[] = [
  { dimension: "Coverage", orizon: "All six services", vendors: "One tool each", inhouse: "Build each" },
  { dimension: "Entry cost", orizon: "from €90", vendors: "€15-50K / tool", inhouse: "€1M+ /yr", highlight: true },
  { dimension: "Time to value", orizon: "Minutes", vendors: "Weeks", inhouse: "Months" },
  { dimension: "Single pane of glass", orizon: "check", vendors: "cross", inhouse: "cross" },
  { dimension: "NIS2 reporting", orizon: "check", vendors: "dash", inhouse: "cross" },
  { dimension: "EU data sovereignty", orizon: "check", vendors: "dash", inhouse: "dash" },
];

const COLUMNS = [
  { id: "orizon", label: "Orizon", isHighlighted: true },
  { id: "vendors", label: "Separate vendors", isHighlighted: false },
  { id: "inhouse", label: "In-house build", isHighlighted: false },
] as const;

// 3. Extracted Icons to match WhyChooseOrizon
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DashIcon = () => (
  <div className="w-3.5 h-3.5 flex items-center justify-center">
    <div className="w-2 h-[1px] bg-gray-600" />
  </div>
);

// 4. Cell Renderer
const CheckCell = ({ value, isHighlighted }: { value: string; isHighlighted?: boolean }) => {
  if (value === "check") {
    return (
      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500/10">
        <CheckIcon />
      </div>
    );
  }
  if (value === "cross") {
    return (
      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-transparent">
        <CrossIcon />
      </div>
    );
  }
  if (value === "dash") {
    return (
      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-transparent">
        <DashIcon />
      </div>
    );
  }
  
  return (
    <span
      className={`font-sans text-sm ${
        isHighlighted
          ? "text-green-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(85,255,85,0.4)]"
          : "text-gray-500"
      }`}
    >
      {value}
    </span>
  );
};

export default function ComparisonSection({ scrollProgress }: ComparisonSectionProps) {
  const opacity = useTransform(scrollProgress, [0.70, 0.75, 0.83, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.70, 0.75, 0.83, 0.85], [50, 0, 0, -50]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-end pr-[10%]"
    >
<div className="w-full max-w-4xl flex flex-col items-start pr-8 magical-border-right">
        
        <SectionHeading
          label="THE COMPARISON"
          title={
            <>
              Full coverage.
              <br className="hidden sm:block" />
              {" "} <span className="text-[#6bef1a]">One sovereign platform.</span>
            </>
          }
          level={2}
          align="right"
          className="mb-10 sm:mb-12"
        />

        {/* Same container styling as WhyChooseOrizon */}
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-md overflow-hidden pointer-events-auto">
          <table className="w-full text-center border-collapse">
            
            {/* Table Header */}
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-left !font-normal text-gray-400 text-sm">Dimension</th>
                {COLUMNS.map((col) => (
                  <th 
                    key={col.id} 
                    className={`p-4 font-normal text-sm ${
                      col.isHighlighted ? "text-green-500" : "text-gray-300"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr 
                  key={i} 
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Dimension Name */}
                  <td className="p-4 text-left text-sm text-gray-300 font-medium">
                    {row.dimension}
                  </td>

                  {/* Dynamic Columns */}
                  {COLUMNS.map((col) => (
                    <td 
                      key={col.id} 
                      className={`p-4 ${
                        col.isHighlighted 
                          ? "bg-green-500/5 border-x border-green-500/10" 
                          : "border-r border-white/5 last:border-r-0"
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <CheckCell 
                          value={row[col.id as keyof TableRow] as string} 
                          isHighlighted={col.isHighlighted && row.highlight} 
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </motion.div>
  );
}