import { colorClasses } from "./color-classes";
import { cn } from "@/lib/utils";

export default function ColorsPage() {
  return (
    <div className="flex gap-4 flex-wrap">
      {colorClasses.sort().map((k) => {
        return (
          <div
            className={cn("size-20 flex justify-center items-center", k)}
            key={k}
          >
            {k}
          </div>
        );
      })}
    </div>
  );
}
