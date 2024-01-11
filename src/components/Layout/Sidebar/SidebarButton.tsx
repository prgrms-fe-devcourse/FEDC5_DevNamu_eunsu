import { LucideIcon } from "lucide-react";

import { ButtonWrappingCSS, IconCSS, IconDescriptionCSS, IconWrappingCSS } from "./styles";

import { cn } from "@/lib/utils";

interface Props {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  AdditionalCSS?: string;
}

const SidebarButton = ({ Icon, label, onClick, AdditionalCSS = "" }: Props) => (
  <button className={`${ButtonWrappingCSS} ${AdditionalCSS}`} onClick={onClick}>
    <div className={cn("relative", IconWrappingCSS)}>
      <Icon className={IconCSS} />
    </div>
    <span className={IconDescriptionCSS}>{label}</span>
  </button>
);

export default SidebarButton;
