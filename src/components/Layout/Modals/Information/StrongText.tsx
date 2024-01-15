import { cn } from "@/lib/utils";

interface Props {
  name: string;
  isTitle?: boolean;
}

const StrongText = ({ name, isTitle }: Props) => (
  <strong className={cn("text-base font-bold text-lime-600", isTitle ? "mb-2 mt-5 block" : "")}>
    {name}
  </strong>
);

export default StrongText;
