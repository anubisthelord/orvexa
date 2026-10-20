"use client";

import React from "react";
import Image from "next/image";

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
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", // Dark server room
    },
    {
      id: 2,
      tag: "Pentesting",
      tagColor: "bg-red-500/20 text-red-400 border-red-500/30",
      readTime: "12 min read",
      title: "Penetration Testing: What It Is, How It Works, and What It Costs in 2026",
      desc: "A comprehensive guide to penetration testing: definition, the 5 phases, leading methodologies,...",
      date: "March 29, 2026",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", // Tech/security
    },
    {
      id: 3,
      tag: "EASM",
      tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      readTime: "10 min read",
      title: "External Attack Surface Management: Why You Can't Protect What You Can't...",
      desc: "Learn what External Attack Surface Management (EASM) is, why it matters, and how continuous...",
      date: "March 28, 2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", // World map/network
    },
  ];

  return (
    <section className="w-full py-24 px-4 font-sans border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">
          Latest Insights
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl">
          Expert guides on NIS2 compliance, penetration testing, and cybersecurity best practices.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors duration-300 cursor-pointer"
            >
              
              {/* Image Area */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-900">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-md ${article.tagColor}`}>
                    {article.tag}
                  </span>
                  <span className="text-white text-[10px] font-medium opacity-80 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-full">
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-white text-lg font-bold leading-snug mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {article.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-xs">{article.date}</span>
                  <span className="text-green-500 text-xs font-medium flex items-center gap-1">
                    Read more <span>→</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <button className="px-6 py-3 bg-transparent border border-white/10 text-gray-400 text-sm rounded-full hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
          View all articles <span>→</span>
        </button>

      </div>
    </section>
  );
}