import { Boxes } from "@/components/Boxes";

const shadows = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export default function ShadowsPage() {
  return <Boxes data={shadows} />;
}
