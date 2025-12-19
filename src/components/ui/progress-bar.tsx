"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import NumberFlow from "@number-flow/react";

interface SegmentedProgressProps {
  value: number;
  segments?: number;
  label?: string;
  className?: string;
  showDemo?: boolean;
}

export function SegmentedProgress({
  value,
  segments = 10,
  label,
  className,
  showDemo = false,
}: SegmentedProgressProps) {
  const [demoValue, setDemoValue] = React.useState(0);

  React.useEffect(() => {
    if (showDemo) {
      const interval = setInterval(() => {
        setDemoValue((v) => (v >= 100 ? 0 : v + 5));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [showDemo]);

  const activeValue = showDemo ? demoValue : value;
  const activeSegments = Math.floor((activeValue / 100) * segments);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
        <span>{label}</span>
        <span className="tabular-nums">
          <NumberFlow value={activeValue} format={{ style: "percent" }} />
        </span>
      </div>
      <div className="flex h-1.5 w-full gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-500 ease-out",
              i < activeSegments
                ? "bg-brand shadow-[0_0_8px_rgba(var(--brand),0.4)]"
                : "bg-muted/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
