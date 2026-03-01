"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "text";
  color?: "gold" | "white" | "dark";
}

const colorMap = {
  gold: {
    primary: "#B8963E",
    accent: "#D4B366",
    text: "#2D2D2D",
    subtext: "#7A7672",
  },
  white: {
    primary: "#FFFFFF",
    accent: "#D4B366",
    text: "#FFFFFF",
    subtext: "rgba(255,255,255,0.5)",
  },
  dark: {
    primary: "#2D2D2D",
    accent: "#4A4A4A",
    text: "#2D2D2D",
    subtext: "#7A7672",
  },
};

function LotusIcon({
  colors,
  size = 40,
}: {
  colors: (typeof colorMap)[keyof typeof colorMap];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center petal */}
      <path
        d="M40 8C40 8 46 24 46 38C46 52 40 58 40 58C40 58 34 52 34 38C34 24 40 8 40 8Z"
        fill={colors.primary}
        opacity="0.9"
      />
      {/* Left-center petal */}
      <path
        d="M28 16C28 16 38 28 40 42C42 56 36 62 36 62C36 62 26 54 24 40C22 26 28 16 28 16Z"
        fill={colors.accent}
        opacity="0.7"
      />
      {/* Right-center petal */}
      <path
        d="M52 16C52 16 42 28 40 42C38 56 44 62 44 62C44 62 54 54 56 40C58 26 52 16 52 16Z"
        fill={colors.accent}
        opacity="0.7"
      />
      {/* Far left petal */}
      <path
        d="M18 28C18 28 30 34 36 46C42 58 36 66 36 66C36 66 22 60 16 48C10 36 18 28 18 28Z"
        fill={colors.primary}
        opacity="0.5"
      />
      {/* Far right petal */}
      <path
        d="M62 28C62 28 50 34 44 46C38 58 44 66 44 66C44 66 58 60 64 48C70 36 62 28 62 28Z"
        fill={colors.primary}
        opacity="0.5"
      />
      {/* Outermost left petal */}
      <path
        d="M10 38C10 38 24 40 32 50C40 60 36 68 36 68C36 68 20 64 12 54C4 44 10 38 10 38Z"
        fill={colors.accent}
        opacity="0.35"
      />
      {/* Outermost right petal */}
      <path
        d="M70 38C70 38 56 40 48 50C40 60 44 68 44 68C44 68 60 64 68 54C76 44 70 38 70 38Z"
        fill={colors.accent}
        opacity="0.35"
      />
      {/* Base/water line */}
      <path
        d="M20 66C20 66 28 60 40 60C52 60 60 66 60 66"
        stroke={colors.primary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  className,
  variant = "full",
  color = "gold",
}: LogoProps) {
  const colors = colorMap[color];

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex items-center", className)}>
        <LotusIcon colors={colors} size={40} />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("inline-flex flex-col items-center", className)}>
        <span
          className="font-serif text-2xl font-bold tracking-wide leading-none"
          style={{ color: colors.text }}
        >
          {"\u0E04\u0E32\u0E23\u0E27\u0E30"}
        </span>
        <span
          className="text-[10px] font-medium tracking-[0.3em] uppercase leading-none mt-1"
          style={{ color: colors.subtext }}
        >
          KARAVA
        </span>
      </div>
    );
  }

  // Full variant: icon + text
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LotusIcon colors={colors} size={36} />
      <div className="flex flex-col">
        <span
          className="font-serif text-2xl font-bold tracking-wide leading-none"
          style={{ color: colors.text }}
        >
          {"\u0E04\u0E32\u0E23\u0E27\u0E30"}
        </span>
        <span
          className="text-[10px] font-medium tracking-[0.3em] uppercase leading-none mt-1"
          style={{ color: colors.subtext }}
        >
          KARAVA
        </span>
      </div>
    </div>
  );
}
