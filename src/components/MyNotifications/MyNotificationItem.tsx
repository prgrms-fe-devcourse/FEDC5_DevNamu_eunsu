import useThreadStore from "@/stores/thread";

import { Separator } from "@/components/ui/separator";

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
    <li className=" cursor-pointer hover:bg-gray-100" onClick={handleClick(postId)}>
      <div className="flex items-center justify-between gap-6 pt-3">
        <p className="pb-1 text-sm text-muted-foreground">{title}</p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      <div className={isMention ? "font-bold" : "mb-1"}>{content}</div>
      <Separator className="mt-3" />
    </li>
  );
};
