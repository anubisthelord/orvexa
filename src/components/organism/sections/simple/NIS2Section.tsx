"use client";

import React from "react";

export default function NIS2Section() {
  const stats = [
    { value: "20,000+", label: "Italian organisations on the ACN NIS list" },
    { value: "84%", label: "Not yet fully compliant (EU survey, 2026)" },
    { value: "12", label: "Days until the Italy deadline" },
    { value: "EUR 10M", label: "Maximum fine" },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          The NIS2 Clock Is Ticking
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-16">
          The EU's most significant cybersecurity regulation is here. Most companies aren't ready.
        </p>

        {/* Stats Grid */}
        <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 shadow-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-xs text-gray-400 leading-relaxed max-w-[200px]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Paragraph Text */}
        <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
          In Italy alone, ACN's NIS list counts over 20,000 organisations, more than 5,000 of them essential. 
          From 31 October 2026 the baseline security measures must be in place and ACN moves from accompaniment 
          to inspection, with fines of up to EUR 10M or 2% of global turnover. Orizon maps your entire attack 
          surface and generates audit-ready NIS2 reports automatically.
        </p>

      </div>
    </section>
  );
}