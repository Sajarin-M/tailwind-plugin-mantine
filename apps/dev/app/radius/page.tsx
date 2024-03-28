import { Boxes } from "@/components/Boxes";

const radius = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export default function RadiusPage() {
  return <Boxes data={radius} className="border border-red-500" />;
}
