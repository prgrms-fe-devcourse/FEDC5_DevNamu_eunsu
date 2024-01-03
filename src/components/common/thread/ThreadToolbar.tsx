import { MessageCircleMoreIcon, PencilLine, Siren, ThumbsUp, Trash2 } from "lucide-react";

interface Props {
  className?: string;
}

const ThreadToolbar = ({ className }: Props) => {
  return (
    <section
      className={`flex items-center justify-between rounded-md border border-gray-300 bg-white ${className}`}
    >
      <button className="p-2 hover:bg-gray-100" aria-label="좋아요">
        <ThumbsUp strokeWidth={1} />
      </button>
      <button className="p-2 hover:bg-gray-100" aria-label="댓글 열기">
        <MessageCircleMoreIcon strokeWidth={1} />
      </button>
      <button className="p-2 hover:bg-gray-100" aria-label="편집">
        <PencilLine strokeWidth={1} />
      </button>
      <button className="p-2 hover:bg-gray-100" aria-label="삭제">
        <Trash2 strokeWidth={1} />
      </button>
      <button className="p-2 text-red-500 hover:bg-gray-100" aria-label="신고">
        <Siren strokeWidth={1} />
      </button>
    </section>
  );
};

export default ThreadToolbar;
