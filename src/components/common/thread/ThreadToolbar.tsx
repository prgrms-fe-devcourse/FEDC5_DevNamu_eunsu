import { MessageCircleMoreIcon, PencilLine, Siren, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";

import ThreadTooltip from "./ThreadTooltip";

interface Props {
  className?: string;
}

const ThreadToolbar = ({ className }: Props) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleMouseEnter = (buttonType: string) => () => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <section
      className={`flex items-center justify-between rounded-md border border-gray-300 bg-white ${className}`}
    >
      <button
        className="relative p-2 hover:bg-gray-100"
        aria-label="좋아요"
        onMouseEnter={handleMouseEnter("like")}
        onMouseLeave={handleMouseLeave}
      >
        <ThumbsUp strokeWidth={1} />
        {hoveredButton === "like" && (
          <ThreadTooltip
            content="좋아요"
            className="-right-2 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      <button
        className="relative p-2 hover:bg-gray-100"
        aria-label="댓글 열기"
        onMouseEnter={handleMouseEnter("comment")}
        onMouseLeave={handleMouseLeave}
      >
        <MessageCircleMoreIcon strokeWidth={1} />
        {hoveredButton === "comment" && (
          <ThreadTooltip
            content="스레드에 댓글 달기"
            className="-right-10 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      <button
        className="relative p-2 hover:bg-gray-100"
        aria-label="편집"
        onMouseEnter={handleMouseEnter("edit")}
        onMouseLeave={handleMouseLeave}
      >
        <PencilLine strokeWidth={1} />
        {hoveredButton === "edit" && (
          <ThreadTooltip
            content="스레드 편집"
            className="-right-5 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      <button
        className="relative p-2 hover:bg-gray-100"
        aria-label="삭제"
        onMouseEnter={handleMouseEnter("delete")}
        onMouseLeave={handleMouseLeave}
      >
        <Trash2 strokeWidth={1} />
        {hoveredButton === "delete" && (
          <ThreadTooltip
            content="스레드 삭제"
            className="-right-5 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      <button
        className="relative p-2 text-red-500 hover:bg-gray-100"
        aria-label="신고"
        onMouseEnter={handleMouseEnter("report")}
        onMouseLeave={handleMouseLeave}
      >
        <Siren strokeWidth={1} />
        {hoveredButton === "report" && (
          <ThreadTooltip
            content="스레드 신고"
            className="-right-5 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
    </section>
  );
};

export default ThreadToolbar;
