import { SendHorizontal } from "lucide-react";

import { cn } from "@/lib/utils.ts";

const CreateSubmit = () => {
  return (
    <button
      className={cn("relative h-12 w-12 cursor-pointer rounded-xl bg-layer-4 text-content-1")}
    >
      <SendHorizontal className={cn("absolute left-4pxr top-1 h-10 w-10 stroke-2")} />
    </button>
  );
};
export default CreateSubmit;
