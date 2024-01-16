import useThreadStore from "@/stores/thread";

import { cn } from "@/lib/utils";

interface Props {
  createdDate: string;
  content: string;
  channelName?: "compliment" | "cheering" | "incompetent" | "improvements";
  postId: string;
  isLike?: boolean;
  isMention?: boolean;
}

const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
  improvements: "개선 사항",
};

export const MyNotificationContent = ({
  createdDate,
  content,
  channelName,
  isMention,
  postId,
  isLike,
}: Props) => {
  const title = channelName
    ? `#${channelMap[channelName]}게시판에서 멘션이 왔어요!`
    : isLike
      ? "좋아요가 달렸어요!"
      : "댓글이 달렸어요!";

  const selectThreadId = useThreadStore((state) => state.selectThreadId);

  const handleClick = (postId: string) => () => {
    selectThreadId(postId);
  };

  return (
    <li
      className="cursor-pointer border-b-[1px] border-b-layer-4 hover:bg-layer-3"
      onClick={handleClick(postId)}
    >
      <div className="flex items-center justify-between gap-6 pb-2 pt-5">
        <p className="text-m text-content-1">{title}</p>
        <p className="text-s font-extralight text-content-2">{createdDate}</p>
      </div>
      <div
        className={cn(
          "text-content-5",
          isMention ? "mb-2 pb-3 text-lg font-bold" : "mb-2 pb-3 text-lg",
        )}
      >
        {content}
      </div>
    </li>
  );
};
