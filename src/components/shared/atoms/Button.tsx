import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variants = {
  primary:
    "relative overflow-hidden bg-gradient-to-br from-[#8fe834] to-[#6cd620] text-[#0d1117] cursor-pointer border border-[#a8ff55]/50 " +
    "backdrop-blur-[16px] " +
    "shadow-[0_8px_32px_0_rgba(127,245,46,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.15)] " +
    "hover:bg-gradient-to-br hover:from-[#a8ff55] hover:to-[#7cf52e] hover:border-[#a8ff55]/80 " +
    "hover:shadow-[0_14px_40px_0_rgba(127,245,46,0.4),0_0_20px_0_rgba(127,245,46,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.9),inset_0_-2px_6px_0_rgba(0,0,0,0.2)] " +
    "active:shadow-[0_4px_16px_0_rgba(127,245,46,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.3),inset_0_2px_4px_0_rgba(0,0,0,0.3)] " +
    "before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none",

  secondary:
    "relative overflow-hidden bg-gradient-to-br from-white/[0.12] to-white/[0.02] backdrop-blur-[16px] border cursor-pointer border-white/20 text-slate-100 " +
    "shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] " +
    "hover:bg-gradient-to-br hover:from-white/[0.2] hover:to-white/[0.06] hover:border-white/40 " +
    "hover:shadow-[0_14px_40px_0_rgba(0,0,0,0.45),0_0_20px_0_rgba(255,255,255,0.15),inset_0_1px_2px_0_rgba(255,255,255,0.6),inset_0_-2px_6px_0_rgba(0,0,0,0.3)] " +
    "active:shadow-[0_4px_16px_0_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_2px_4px_0_rgba(0,0,0,0.4)] " +
    "before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/[0.2] before:to-transparent before:pointer-events-none",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full cursor-pointer",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span 
          aria-hidden="true" 
          className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
        >
          {icon}
        </span>
      )}
      
      {/* z-10 ensures text stays above the highlight layer */}
      <span className="relative z-10">{children}</span>

      {icon && iconPosition === "right" && (
        <span 
          aria-hidden="true" 
          className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          {icon}
        </span>
      )}
    </button>
  );
}