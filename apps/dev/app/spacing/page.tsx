import { Boxes } from "@/components/Boxes";

const spacings = {
  xs: "w-xs",
  sm: "w-sm",
  md: "w-md",
  lg: "w-lg",
  xl: "w-xl",
};

export default function SpacingPage() {
  return <Boxes data={spacings} className="border border-black" />;
}
