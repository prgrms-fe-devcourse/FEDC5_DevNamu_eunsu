import { cn } from "@/lib/utils.ts";

const PatchSubmit = () => {
  return (
    <div className="flex items-center gap-2 text-content-4">
      <button className="rounded-sm bg-layer-3 p-3 hover:bg-layer-4">취소</button>
      <button
        className={cn("rounded-sm border border-layer-2 p-3 text-content-5", "cursor-not-allowed")}
      >
        확인
      </button>
    </div>
  );
};

export default PatchSubmit;
