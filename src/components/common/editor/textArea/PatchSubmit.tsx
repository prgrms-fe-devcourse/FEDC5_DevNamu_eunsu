import { cn } from "@/lib/utils.ts";
import { SubmitProps } from "@/components/common/editor/textArea/ContentTextArea.tsx";

interface Props extends SubmitProps {
  onEditClose: () => void;
}

const PatchSubmit = ({ onSubmit, onEditClose, isContent }: Props) => {
  const handleSubmit = () => {
    onSubmit();
    onEditClose();
  };

  return (
    <div className="flex items-center gap-2 text-content-4">
      <button className="rounded-sm bg-layer-3 p-3 hover:bg-layer-4" onClick={onEditClose}>
        취소
      </button>
      <button
        onClick={handleSubmit}
        className={cn(
          "rounded-sm border border-layer-2 p-3 text-content-5",
          isContent ? "border-blue-100 bg-blue-100 dark:text-blue-600" : "cursor-not-allowed",
        )}
      >
        확인
      </button>
    </div>
  );
};

export default PatchSubmit;
