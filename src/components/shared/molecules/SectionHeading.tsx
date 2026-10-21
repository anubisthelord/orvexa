import type { ReactNode } from "react";

type ContentWidth =
  | "full"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

type SectionHeadingProps = {
  title: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  level?: 2 | 3;
  align?: "left" | "center" | "right";
  titleWidth?: ContentWidth;
  descriptionWidth?: ContentWidth;
  className?: string;
};

const widthClasses: Record<ContentWidth, string> = {
  full: "max-w-full",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export default function SectionHeading({
  title,
  label,
  description,
  level = 2,
  align = "center",
  titleWidth = "4xl", 
  descriptionWidth = "3xl", 
  className = "",
}: SectionHeadingProps) {
  const HeadingTag = level === 2 ? "h2" : "h3";

  // 1. Parent alignment controls text-align and items alignment
  const parentAlignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  // 2. Child alignment controls the auto-margins for max-width constraints
  const childMargin = {
    left: "mr-auto ml-0",
    center: "mx-auto",
    right: "ml-auto mr-0",
  }[align];

  return (
    <div
      className={`flex w-full flex-col gap-4 ${parentAlignment} ${className}`}
    >
      <div className="flex w-full flex-col gap-3">
        {label && <span className="eyebrow">{label}</span>}

        <HeadingTag
          className={`w-full text-balance ${widthClasses[titleWidth]} ${childMargin}`}
        >
          {title}
        </HeadingTag>
      </div>

      {description && (
        <p
          className={`w-full leading-relaxed ${widthClasses[descriptionWidth]} ${childMargin}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}