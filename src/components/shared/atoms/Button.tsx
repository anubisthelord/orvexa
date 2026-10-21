import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variants = {
  primary:
    "bg-brand text-inverse hover:bg-brand-hover cursor-pointer focus-visible:ring-brand shadow-[0_0_15px_rgba(49,222,116,0.2)] hover:shadow-[0_0_25px_rgba(49,222,116,0.4)]",
  secondary:
    "bg-surface backdrop-blur-md border cursor-pointer border-white/10 text-text-secondary hover:bg-white/10 hover:text-white hover:border-white/20 focus-visible:ring-white/30",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
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
       
        "group inline-flex items-center justify-center gap-2 rounded-md cursor-pointer",
        // Smooth lift on hover
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        // Animate ALL properties with a premium custom easing curve
        "font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        // Focus ring for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
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
          className="transition-transform duration-300  ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
        >
          {icon}
        </span>
      )}

      {children}

      {icon && iconPosition === "right" && (
        <span 
          aria-hidden="true" 
          className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          {icon}
        </span>
      )}
    </button>
  );
}