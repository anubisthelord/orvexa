"use client";

import React from "react";

export default function WhyChooseOrizon() {
  const features = [
    { name: "External Attack Surface", orizon: true, edr: true, vmeas: true },
    { name: "Internal Discovery", orizon: true, edr: false, vmeas: true },
    { name: "AI Penetration Testing", orizon: true, edr: false, vmeas: false },
    { name: "NIS2 Native Compliance", orizon: true, edr: false, vmeas: false },
    { name: "7 Compliance Frameworks", orizon: true, edr: false, vmeas: false },
    { name: "143 Security Controls", orizon: true, edr: false, vmeas: false },
    { name: "4 Automated Report Types", orizon: true, edr: false, vmeas: false },
    { name: "From EUR 90/scan", orizon: true, edr: false, vmeas: false },
    { name: "Multi-Client Dashboard", orizon: true, edr: false, vmeas: false },
  ];

  const Check = ({ active }: { active: boolean }) => (
    <div className={`w-5 h-5 flex items-center justify-center rounded-full ${active ? 'bg-green-500/10' : 'bg-transparent'}`}>
      {active ? (
        <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );

  return (
    <section className="w-full bg-[#050505] py-24 px-4 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">Why Teams Choose Orizon</h2>
        <p className="text-gray-400 text-center mb-16">
          Enterprise security capabilities without enterprise complexity or pricing.
        </p>

        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-white/10 bg-white/5 p-4 text-center">
            <div className="text-left font-bold text-gray-400 text-sm">Feature</div>
            <div className="text-green-500 font-bold text-sm">Orizon</div>
            <div className="text-gray-300 font-bold text-sm">Traditional EDR</div>
            <div className="text-gray-300 font-bold text-sm">Traditional VM/EASM</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {features.map((feature, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 text-left text-sm text-gray-300 font-medium">{feature.name}</div>
                <div className="p-4 flex justify-center items-center bg-green-500/5 border-x border-green-500/10">
                  <Check active={feature.orizon} />
                </div>
                <div className="p-4 flex justify-center items-center border-r border-white/5">
                  <Check active={feature.edr} />
                </div>
                <div className="p-4 flex justify-center items-center">
                  <Check active={feature.vmeas} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}