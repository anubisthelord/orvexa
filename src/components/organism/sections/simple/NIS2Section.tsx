"use client";

import React from "react";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

// 1. Define strict type for the stats
type Stat = {
  value: string;
  label: string;
};

// 2. Move static data outside the component
const STATS: Stat[] = [
  { value: "20,000+", label: "Italian organisations on the ACN NIS list" }, // 8 words (1 extra)
  { value: "84%", label: "Not yet fully compliant in EU survey" }, // 7 words
  { value: "12", label: "Days until the strict Italian deadline hits" }, // 7 words
  { value: "EUR 10M", label: "The maximum fine for non-compliance" }, // 7 words
];

export default function NIS2Section() {
  return (
    <section className="w-full   py-16 sm:py-20 xl:py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 3. Replaced raw heading tags with the shared SectionHeading component */}
        <SectionHeading
          title="The NIS2 Clock Is Ticking"
          description="The EU's most significant cybersecurity regulation is here. Most companies aren't ready."
          level={2}
          align="center"
        />

        {/* Stats Grid */}
        <div className="bg-bg border border-border-subtle rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shadow-2xl my-12 overflow-hidden">
  {STATS.map((stat, i) => (
    <div 
      key={i} 
      className={`
        relative flex flex-col items-center justify-center text-center p-5
        
        /* Mobile (1 col): Horizontal line at bottom for all except last */
        ${i !== STATS.length - 1 ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60%] after:h-[1px] after:bg-green-500/50" : ""} 
        
        /* Tablet (2 cols): Vertical line on right for odd items, horizontal line at bottom for top row */
        md:after:w-[1px] md:after:h-[60%] md:after:left-auto md:after:bottom-auto md:after:top-1/2 md:after:-translate-y-1/2 md:after:translate-x-0
        ${i % 2 === 0 ? "md:after:right-0 md:after:bg-green-500/50" : "md:after:hidden"}
        ${i < 2 ? "md:after:!block md:after:!bottom-0 md:after:!left-1/2 md:after:!top-auto md:after:!-translate-y-0 md:after:!-translate-x-1/2 md:after:!w-[60%] md:after:!h-[1px]" : ""}
        
        /* Desktop (4 cols): Vertical line on right for all except last */
        lg:after:!block lg:after:!w-[1px] lg:after:!h-[60%] lg:after:!top-1/2 lg:after:!bottom-auto lg:after:!-translate-y-1/2 lg:after:!right-0 lg:after:!left-auto lg:after:!translate-x-0 lg:after:!bg-green-500/50
        ${i === STATS.length - 1 ? "lg:after:!hidden" : ""}
      `}
    >
      <span className="text-3xl font-medium text-white mb-2">
        {stat.value}
      </span>
      <span className="text-sm text-gray-400">
        {stat.label}
      </span>
    </div>
  ))}
</div>
        {/* Paragraph Text */}
        <p className="text-center">
          In Italy alone, ACN's NIS list counts over 20,000 organisations, more than 5,000 of them essential. 
          From 31 October 2026 the baseline security measures must be in place and ACN moves from accompaniment 
          to inspection, with fines of up to EUR 10M or 2% of global turnover. Orizon maps your entire attack 
          surface and generates audit-ready NIS2 reports automatically.
        </p>

      </div>
    </section>
  );
}