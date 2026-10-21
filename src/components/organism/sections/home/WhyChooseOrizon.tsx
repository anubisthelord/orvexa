"use client";

import SectionHeading from "@/components/shared/molecules/SectionHeading";

// 1. Define the type for strict data integrity
type Feature = {
  name: string;
  orizon: boolean;
  edr: boolean;
  vmeas: boolean;
};

// 2. Move static data outside the component to prevent re-creation on render
const FEATURES: Feature[] = [
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

const COLUMNS = [
  { id: "orizon", label: "Orizon", isHighlighted: true },
  { id: "edr", label: "Traditional EDR", isHighlighted: false },
  { id: "vmeas", label: "Traditional VM/EASM", isHighlighted: false },
] as const;

// 3. Extracted Icons for cleaner JSX
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

// 4. Extracted Cell Component
const CheckCell = ({ active }: { active: boolean }) => (
  <div className={`w-5 h-5 flex items-center justify-center rounded-full ${active ? "bg-green-500/10" : "bg-transparent"}`}>
    {active ? <CheckIcon /> : <CrossIcon />}
  </div>
);

export default function WhyChooseOrizon() {
  return (
    <section className="w-full   py-16 sm:py-20 xl:py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <SectionHeading
          title="Why Teams Choose Orizon"
          description="Enterprise security capabilities without enterprise complexity or pricing."
          level={2}
          className="mb-10 sm:mb-12"
          align="center"
        />

        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-md overflow-hidden">
          {/* Native Table for better Accessibility */}
          <table className="w-full text-center border-collapse">
            
            {/* Table Header */}
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-left font-bold text-gray-400 text-sm">Feature</th>
                {COLUMNS.map((col) => (
                  <th 
                    key={col.id} 
                    className={`p-4 font-bold text-sm ${col.isHighlighted ? "text-green-500" : "text-gray-300"}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {FEATURES.map((feature, i) => (
                <tr 
                  key={i} 
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Feature Name */}
                  <td className="p-4 text-left text-sm text-gray-300 font-medium">
                    {feature.name}
                  </td>

                  {/* Dynamic Columns mapping to avoid repeated <td> blocks */}
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
                        <CheckCell active={feature[col.id as keyof Feature] as boolean} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}