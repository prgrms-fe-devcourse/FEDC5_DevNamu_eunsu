import { SendHorizontal } from "lucide-react";
import { UseFormHandleSubmit } from "react-hook-form";

import { cn } from "@/lib/utils.ts";
import { FormValues } from "@/components/common/editor/EditorTextArea.tsx";

interface Props {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  isValues: boolean;
}
const CreateSubmit = ({ handleSubmit, isValues }: Props) => {
  return (
    <button
      onClick={() => handleSubmit}
      className={cn(
        "relative h-12 w-12 cursor-pointer rounded-xl bg-layer-4 text-content-1",
        isValues && "bg-blue-200 text-blue-600",
      )}
    >
      <SendHorizontal
        className={cn("absolute left-4pxr top-1 h-10 w-10 stroke-2", isValues && "fill-blue-300")}
      />
    </button>
  );
};
export default CreateSubmit;
