import React from "react";

interface Section {
  id: string;
  label: string;
  stage: string;
}

interface SideNavigationProps {
  sections: Section[];
  activeIndex: number;
}

export default function SideNavigation({ sections, activeIndex }: SideNavigationProps) {
  return (
    <nav className="fixed left-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 pointer-events-none font-mono text-[11px] tracking-[0.2em]">
      {sections.map((section, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={section.id} className="flex items-center gap-4 transition-colors duration-500">
            <span
              className={`h-[1px] transition-all duration-500 ${
                isActive ? "w-10 bg-green-500" : "w-6 bg-gray-600"
              }`}
            />
            <span className={isActive ? "text-green-500 font-bold" : "text-gray-500"}>
              {section.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}