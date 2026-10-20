"use client";

import React from "react";

export default function ServicesGridSection() {
  const services = [
    {
      title: "RECON",
      subtitle: "Know What Attackers See",
      desc: "Map your entire external attack surface and discover the vulnerabilities waiting to be exploited. From forgotten subdomains to exposed APIs, RECON finds what you've missed.",
      features: [
        "Discover forgotten subdomains and shadow IT",
        "Continuous monitoring with CVE correlation",
        "Prioritized risk scores for faster remediation",
      ],
      action: "Discover RECON",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-green-500/20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9m-9 16.5h9M4.5 7.5v9m15-9v9M3 12h18M6 6l12 12M18 6L6 18" />
        </svg>
      ),
    },
    {
      title: "OVERSIGHT",
      subtitle: "Enterprise SOC Without Enterprise Costs",
      desc: "Detect threats in minutes instead of months. OVERSIGHT correlates alerts into complete attack narratives, so your team sees the real threats—not alert noise.",
      features: [
        "Threat detection in under 5 minutes",
        "500+ integrations with your existing tools",
        "NIS2 incident reporting built-in",
      ],
      action: "Learn about OVERSIGHT",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-green-500/20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "ORIZON AI",
      subtitle: "AI That Respects Your Data",
      desc: "Enterprise AI that runs entirely on your infrastructure. Your data never leaves your servers, your compliance stays intact, and your competitive edge stays yours.",
      features: [
        "100% on-premise—full data sovereignty",
        "EU AI Act compliant, GDPR guaranteed",
        "Custom model training on your data",
      ],
      action: "Explore ORIZON AI",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-green-500/20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-bold tracking-widest uppercase mb-6">
          Complete Security Toolkit
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Every Tool You Need To Win</h2>
        <p className="text-gray-400 text-center max-w-2xl mb-16">
          Six integrated services that work together to protect your attack surface, detect threats, monitor the dark web, empower your team, and keep you compliant.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col group hover:border-green-500/30 transition-colors duration-300">
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-white font-mono text-sm font-bold tracking-widest mb-2">{service.title}</h3>
              <h4 className="text-white text-xl font-bold mb-4 leading-tight">{service.subtitle}</h4>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{service.desc}</p>
              
              <ul className="flex flex-col gap-3 mb-8">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-500 mt-0.5">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-white/5">
                <button className="text-green-500 text-sm font-medium hover:text-green-400 flex items-center gap-2 transition-colors">
                  {service.action}
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}