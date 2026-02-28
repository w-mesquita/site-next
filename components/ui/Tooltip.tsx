"use client";

import { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  /** Posição do tooltip em relação ao trigger */
  side?: "top" | "bottom";
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`absolute left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs font-medium shadow-md transition-opacity
            ${side === "top" ? "bottom-full mb-2" : "top-full mt-2"}`}
          style={{
            backgroundColor: "var(--color-text)",
            color: "var(--color-background)",
          }}
        >
          {content}
        </span>
      )}
    </div>
  );
}
