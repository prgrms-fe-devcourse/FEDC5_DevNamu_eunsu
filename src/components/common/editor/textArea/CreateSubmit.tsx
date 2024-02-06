import { SendHorizontal } from "lucide-react";

import { cn } from "@/lib/utils.ts";
import { SubmitProps } from "@/components/common/editor/textArea/ContentTextArea.tsx";

const CreateSubmit = ({ onSubmit, isContent }: SubmitProps) => {
  return (
    <button
      onClick={onSubmit}
      className={cn(
        "relative h-12 w-12 cursor-pointer rounded-xl bg-layer-4 text-content-1",
        isContent && "bg-blue-200 text-blue-600",
      )}
    >
      <SendHorizontal
        className={cn("absolute left-4pxr top-1 h-10 w-10 stroke-2", isContent && "fill-blue-300")}
      />
    </button>
  );
};
export default CreateSubmit;
