import { cn } from "@/lib/utils";

interface Props {
  type: string;
  className?: string;
}

const EmptyThread = ({ type, className }: Props) => {
  return (
    <div
      className={cn("mt-[-170px] flex h-screen flex-col items-center justify-center", className)}
    >
      <div className=" text-9xl font-bold text-gray-300">텅...</div>
      <div className="mt-20 text-4xl font-bold text-gray-300">
        {type === "notification" ? "아직 알림이 없어요!" : "어서 글을 작성해주세요!"}
      </div>
    </div>
  );
};

export default EmptyThread;
