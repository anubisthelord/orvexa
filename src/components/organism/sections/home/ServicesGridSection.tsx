"use client";

import React, { ReactNode } from "react";
import {
  HiOutlineViewfinderCircle,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import SectionHeading from "@/components/shared/molecules/SectionHeading";

type Service = {
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  action: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
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
    icon: <HiOutlineViewfinderCircle className="w-16 h-16 text-green-500/20" />,
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
    icon: <HiOutlineShieldCheck className="w-16 h-16 text-green-500/20" />,
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
    icon: <HiOutlineCpuChip className="w-16 h-16 text-green-500/20" />,
  },
];

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="flex flex-col gap-1.5 mb-8">
    {features.map((feature, j) => (
      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
        <span className="text-green-500 mt-0.5">→</span>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

export default function ServicesGridSection() {
  return (
    <section className="w-full   py-16 sm:py-20 xl:py-24  ">
      <div className="container mx-auto px-4 ">
        
        {/* Properly using the SectionHeading component */}
        <SectionHeading
          label="Complete Security Toolkit"
          title="Every Tool You Need To Win"
          description="Six integrated services that work together to protect your attack surface, detect threats, monitor the dark web, empower your team, and keep you compliant."
          level={2}
          descriptionWidth="2xl"
          className="mb-8 xl:mb-12"
          align="center"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto ">
          {SERVICES.map((service, i) => (
            <div 
              key={i} 
              className="hover:bg-surface border border-border magical-border-right rounded-md p-5 flex flex-col group hover:border-green-500/30 transition-colors duration-300"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className=" mb-2">
                {service.title}
              </h3>
              <h4 className="text-white mb-4 leading-tight">
                {service.subtitle}
              </h4>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                {service.desc}
              </p>
              
              <FeatureList features={service.features} />

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