"use client";

import React from "react";

export default function ProcessStepsSection() {
  const steps = [
    {
      num: "1",
      title: "Connect Your Domain",
      desc: "Enter your domain. No agents, no configuration, no firewall changes required.",
      tag: "RECON",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9m-9 16.5h9M4.5 7.5v9m15-9v9M3 12h18M6 6l12 12M18 6L6 18" />,
      active: true,
    },
    {
      num: "2",
      title: "We Map Everything",
      desc: "Subdomains, open ports, technology stack, known vulnerabilities — all discovered automatically.",
      tag: "RECON",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
      active: false,
    },
    {
      num: "3",
      title: "AI Tests Your Defenses",
      desc: "Fireline simulates real attacker behavior across 143 controls and 7 compliance frameworks.",
      tag: "FIRELINE",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
      active: false,
    },
    {
      num: "4",
      title: "Monitor Around the Clock",
      desc: "OVERSIGHT's 24/7 SOC correlates every alert into an attack narrative and responds in minutes, not months.",
      tag: "OVERSIGHT",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
      active: false,
    },
    {
      num: "5",
      title: "Get Compliance Reports",
      desc: "ACN, NIS2, ISO 27001 - audit-ready reports generated automatically.",
      tag: "RECON",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
      active: false,
    },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">From Zero to Compliant in 5 Steps</h2>
        <p className="text-gray-400 text-center mb-16">
          No consultants. No manual audits. Automated end-to-end.
        </p>

        <div className="relative w-full flex flex-col lg:flex-row gap-6 justify-between z-10">
          
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[20px] left-[5%] right-[5%] h-[1px] bg-white/10 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center w-full lg:w-[18%] z-10">
              
              {/* Number Bubble */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-6 shadow-lg ${
                step.active 
                  ? "bg-[#55ff55] text-black shadow-[0_0_20px_rgba(85,255,85,0.4)]" 
                  : "bg-[#111] text-gray-400 border border-white/10"
              }`}>
                {step.num}
              </div>

              {/* Card */}
              <div className={`w-full h-full rounded-xl p-5 border flex flex-col ${
                step.active 
                  ? "bg-[#0a1a0a] border-green-500/40" 
                  : "bg-[#0a0a0a] border-white/5"
              }`}>
                
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${
                  step.active ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400"
                }`}>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    {step.icon}
                  </svg>
                </div>

                <h3 className={`text-sm font-bold mb-2 ${step.active ? "text-white" : "text-gray-300"}`}>
                  {step.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed mb-8 flex-grow">
                  {step.desc}
                </p>

                <div className="mt-auto">
                  <span className={`inline-block px-2 py-1 rounded text-[9px] font-bold tracking-widest ${
                    step.active 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-white/5 text-gray-500"
                  }`}>
                    {step.tag}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}