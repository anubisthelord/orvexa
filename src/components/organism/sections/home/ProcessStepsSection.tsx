import type { ReactNode } from "react";
import SectionHeading from "@/components/shared/molecules/SectionHeading";
import {
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineBolt,
} from "react-icons/hi2";

// UPDATED: Explicit type makes the step data easier to maintain.
// ReactNode allows us to pass the react-icons components directly.
type ProcessStep = {
  num: string;
  title: string;
  desc: string;
  tag: string;
  icon: ReactNode;
  active: boolean;
};

export default function ProcessStepsSection() {
  const steps: ProcessStep[] = [
    {
      num: "1",
      title: "Connect Your Domain",
      desc: "Enter your domain. No agents, no configuration, no firewall changes required.",
      tag: "RECON",
      icon: <HiOutlineGlobeAlt />,
      active: true,
    },
    {
      num: "2",
      title: "We Map Everything",
      desc: "Subdomains, open ports, technology stack, known vulnerabilities — all discovered automatically.",
      tag: "RECON",
      icon: <HiOutlineBolt />,
      active: false,
    },
    {
      num: "3",
      title: "AI Tests Your Defenses",
      desc: "Fireline simulates real attacker behavior across 143 controls and 7 compliance frameworks.",
      tag: "FIRELINE",
      icon: <HiOutlineCpuChip />,
      active: false,
    },
    {
      num: "4",
      title: "Monitor Around the Clock",
      desc: "OVERSIGHT's 24/7 SOC correlates every alert into an attack narrative and responds in minutes, not months.",
      tag: "OVERSIGHT",
      icon: <HiOutlineShieldCheck />,
      active: false,
    },
    {
      num: "5",
      title: "Get Compliance Reports",
      desc: "ACN, NIS2, ISO 27001 - audit-ready reports generated automatically.",
      tag: "RECON",
      icon: <HiOutlineDocumentText />,
      active: false,
    },
  ];

  return (
    <section className="w-full  bg-bg-secondary py-16 sm:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="From Zero to Compliant in 5 Steps"
          title="Security That Never Sleeps For You"
          description="No consultants. No manual audits. Automated end-to-end."
          level={2}
          descriptionWidth="4xl"
          className="mb-10 sm:mb-12"
          align="center"
        />

        <ol className="relative grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-5">
          {/* Decorative connecting line for desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[5%] right-[5%] top-5 z-0 hidden h-px bg-white/10 xl:block"
          />

          {steps.map((step) => (
            <li
              key={step.num}
              aria-current={step.active ? "step" : undefined}
              className="relative z-10 flex min-w-0 flex-col items-center"
            >
              {/* Number bubble */}
              <div
                aria-hidden="true"
                className={`mb-6 flex size-10 shrink-0 items-center justify-center rounded font-bold text-sm ${step.active
                    ? "bg-brand text-inverse shadow-[0_0_20px_rgba(49,222,116,0.25)]"
                    : "border border-white/10 bg-[#111] text-gray-400"
                  }`}
              >
                {step.num}
              </div>

              {/* Card Container */}
              <div
                className={`flex h-full w-full flex-col gap-5 rounded-md border p-5 transition-colors duration-300 ${step.active
                    ? "border-brand/40 bg-[#0a1a0a]"
                    : "border-white/5 bg-[#0a0a0a] hover:border-white/20"
                  }`}
              >
                {/* Icon Container */}
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded ${step.active
                      ? "bg-brand/20 text-brand"
                      : "bg-white/5 text-gray-400"
                    }`}
                >
                  {/* UPDATED: Using react-icons instead of raw SVG paths */}
                  <span className="text-xl" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>

                <div>
                  <h3
                    className={`mb-2 leading-heading ${step.active ? "text-white" : "text-gray-300"
                      }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm !leading-snug text-gray-500">
                    {step.desc}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="mt-auto pt-1">
                  <span
                    className={`inline-block rounded px-2 py-1 text-[9px] font-bold tracking-widest ${step.active
                        ? "bg-brand/20 text-brand"
                        : "bg-white/5 text-gray-500"
                      }`}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}