import { MessageCircleMoreIcon, PencilLine, Siren, ThumbsUp, Trash2 } from "lucide-react";
import { MouseEvent, useState } from "react";

import ThreadTooltip from "./ThreadTooltip";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import { cn } from "@/lib/utils";

interface Props {
  authorId: string;
  handleClickLikeButton: (event: MouseEvent) => void;
  handleClickEditButton: (event: MouseEvent) => void;
  className?: string;
  onDelete: (event: MouseEvent) => void;
}

const ThreadToolbar = ({
  authorId,
  handleClickLikeButton,
  handleClickEditButton,
  onDelete,
  className,
}: Props) => {
  const { user } = useGetUserInfo();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleMouseEnter = (buttonType: string) => () => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <section
      className={cn(
        "border-layer-5 bg-layer-1 flex items-center justify-between rounded-md border",
        className,
      )}
    >
      <button
        className="hover:bg-layer-4 relative p-2"
        aria-label="좋아요"
        onMouseEnter={handleMouseEnter("like")}
        onMouseLeave={handleMouseLeave}
        onClick={handleClickLikeButton}
      >
        <ThumbsUp strokeWidth={1} />
        {hoveredButton === "like" && (
          <ThreadTooltip
            content="좋아요"
            className="absolute -right-2 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      <button
        className="hover:bg-layer-4 relative p-2"
        aria-label="댓글 열기"
        onMouseEnter={handleMouseEnter("comment")}
        onMouseLeave={handleMouseLeave}
      >
        <MessageCircleMoreIcon strokeWidth={1} />
        {hoveredButton === "comment" && (
          <ThreadTooltip
            content="스레드에 댓글 달기"
            className="absolute -right-10 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
      {user?._id === authorId && (
        <>
          <button
            className="hover:bg-layer-4 relative p-2"
            aria-label="편집"
            onMouseEnter={handleMouseEnter("edit")}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickEditButton}
          >
            <PencilLine strokeWidth={1} />
            {hoveredButton === "edit" && (
              <ThreadTooltip
                content="스레드 편집"
                className="absolute -right-5 bottom-full  mb-2 w-auto whitespace-nowrap"
              />
            )}
          </button>
          <button
            className="hover:bg-layer-4 relative p-2"
            aria-label="삭제"
            onMouseEnter={handleMouseEnter("delete")}
            onMouseLeave={handleMouseLeave}
            onClick={onDelete}
          >
            <Trash2 strokeWidth={1} />
            {hoveredButton === "delete" && (
              <ThreadTooltip
                content="스레드 삭제"
                className="absolute -right-5 bottom-full mb-2 w-auto whitespace-nowrap"
              />
            )}
          </button>
        </>
      )}

      <button
        className="hover:bg-layer-4 relative overflow-x-visible p-2 text-red-500"
        aria-label="신고"
        onMouseEnter={handleMouseEnter("report")}
        onMouseLeave={handleMouseLeave}
      >
        <Siren strokeWidth={1} />
        {hoveredButton === "report" && (
          <ThreadTooltip
            content="스레드 신고"
            className="absolute -right-5 bottom-full mb-2 w-auto whitespace-nowrap"
          />
        )}
      </button>
    </section>
  );
};

export default ThreadToolbar;
