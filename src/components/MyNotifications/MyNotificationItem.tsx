import { Separator } from "@/components/ui/separator";

interface Props {
  createdDate: string;
  content: string;
  channelName?: string;
  postId: string;
  isLike?: boolean;
  isMention?: boolean;
}
export const MyNotificationContent = ({
  createdDate,
  content,
  channelName,
  isMention,
  postId,
  isLike,
}: Props) => {
  const title = channelName
    ? `#${channelName}에서 멘션이 왔어요!`
    : isLike
      ? "like"
      : "댓글이 달렸어요!";

  console.log("postId", postId);
  return (
    <li>
      <div className="flex items-center justify-between gap-6 pt-6">
        <p className="pb-1 text-sm text-muted-foreground">{title}</p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      <div className={isMention ? "font-bold" : "mb-1"}>{content}</div>

      <Separator />
    </li>
  );
};
