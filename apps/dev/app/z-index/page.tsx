"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function Item({ className }: { className: string }) {
  const [zIndex, setZIndex] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setZIndex(getComputedStyle(ref.current).zIndex);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "h-20 relative items-center border border-red-500",
        className,
      )}
    >
      {className} {zIndex}
    </div>
  );
}

export default function ZIndexPage() {
  return (
    <div className="relative">
      {["z-app", "z-modal", "z-popover", "z-overlay", "z-max"].map(
        (className) => (
          <Item className={className} key={className} />
        ),
      )}
    </div>
  );
}
