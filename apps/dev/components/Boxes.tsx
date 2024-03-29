import { cn } from "@/lib/utils";

export function Boxes({
  data,
  className,
}: {
  data: Record<string, string>;
  className?: string;
}) {
  return (
    <div className="space-y-4 p-4">
      {Object.entries(data).map(([k, v]) => (
        <div
          key={k}
          className={cn(
            "size-20 flex justify-center items-center",
            className,
            v,
          )}
        >
          {k}
        </div>
      ))}
    </div>
  );
}
