"use client";

import Button from "@/components/shared/atoms/Button";
import SectionHeading from "@/components/shared/molecules/SectionHeading";
import React from "react";

export default function InsightsSection() {
  const articles = [
    {
      id: 1,
      tag: "NIS2",
      tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      readTime: "12 min read",
      title: "NIS2 Directive: The Complete Compliance Guide for European...",
      desc: "Everything you need to know about NIS2 compliance: who it applies to, key requirements, deadlines,...",
      date: "March 30, 2026",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "Pentesting",
      tagColor: "bg-red-500/20 text-red-400 border-red-500/30",
      readTime: "12 min read",
      title: "Penetration Testing: What It Is, How It Works, and What It Costs in 2026",
      desc: "A comprehensive guide to penetration testing: definition, the 5 phases, leading methodologies,...",
      date: "March 29, 2026",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "EASM",
      tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      readTime: "10 min read",
      title: "External Attack Surface Management: Why You Can't Protect What You Can't...",
      desc: "Learn what External Attack Surface Management (EASM) is, why it matters, and how continuous...",
      date: "March 28, 2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      tag: "EASM",
      tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      readTime: "10 min read",
      title: "External Attack Surface Management: Why You Can't Protect What You Can't...",
      desc: "Learn what External Attack Surface Management (EASM) is, why it matters, and how continuous...",
      date: "March 28, 2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      tag: "EASM",
      tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      readTime: "10 min read",
      title: "External Attack Surface Management: Why You Can't Protect What You Can't...",
      desc: "Learn what External Attack Surface Management (EASM) is, why it matters, and how continuous...",
      date: "March 28, 2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full   py-16 sm:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">

        <SectionHeading
          label="Why Choose Us"
          title="Security That Never Sleeps For You"
          description="True resilience requires more than a firewall. We provide an integrated ecosystem of AI-driven penetration testing, continuous attack surface monitoring, and real-time compliance. Protect your entire infrastructure so you can innovate with absolute confidence, knowing every digital layer is fortified against tomorrow's threats."
          level={2}
          descriptionWidth="4xl"
          className="mb-16"
          align="center"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-full mb-12">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-[#0a0a0a] border border-white/4 rounded overflow-hidden flex flex-col group hover:border-white/20 transition-colors duration-300 cursor-pointer"
            >

              {/* Image Area */}
              <div className="relative h-48 m-1.5 mb-0 overflow-hidden bg-gray-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay Tags */}

              </div>

              {/* Content Area */}

              <div className="flex flex-grow flex-col gap-2 p-5">
                <h3 className=" line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm leading-snug line-clamp-2 hidden">
                  {article.desc}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-gray-500">
                    {article.date}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                    Read more <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {/* Bottom Button */}
        <Button variant="primary" size="md" icon="→">
          View all articles
        </Button>
      </div>
    </section>
  );
}