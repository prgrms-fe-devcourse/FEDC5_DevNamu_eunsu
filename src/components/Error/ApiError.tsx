import { RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
  refetch: () => void;
  className?: string;
}

const ApiError = ({ refetch, className }: Props) => {
  return (
    <div className={cn("flex w-full items-center justify-center text-center", className)}>
      <div>
        <span className="block">데이터를 불러오는 중 에러가 발생했습니다.</span>
        <span className="block">새로 고침을 눌러 다시 시도해주세요.</span>
        <div className="mt-2 flex cursor-pointer justify-center" onClick={refetch}>
          <RotateCw />
        </div>
      </div>
    </div>
  );
};

export default ApiError;
