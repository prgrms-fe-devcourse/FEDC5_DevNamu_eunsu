import { MessageSquareText, PencilLine, Siren, ThumbsUp, Trash2 } from "lucide-react";

const ThreadToolbar = () => {
  return (
    <section className="flex items-center justify-between space-x-5pxr rounded-md bg-gray-400 p-2 text-white">
      <button aria-label="좋아요">
        <ThumbsUp />
      </button>
      <button aria-label="댓글 열기">
        <MessageSquareText />
      </button>
      <button aria-label="편집">
        <PencilLine />
      </button>
      <button aria-label="삭제">
        <Trash2 />
      </button>
      <button aria-label="신고" className="text-red-500">
        <Siren />
      </button>
    </section>
  );
};

export default ThreadToolbar;
