import { Separator } from "@/components/ui/separator";

interface Props {
  createdDate: string;
  content: string;
  channelName?: string;
  postId: string;
}
export const MyNotificationContent = ({ createdDate, content, channelName, postId }: Props) => {
  const title = channelName ? `#${channelName}에서 멘션이 왔어요!` : "댓글이 달렸어요!";
  return (
    <li>
      <div className="flex items-center justify-between gap-6 pt-6">
        <p className="pb-1 text-sm text-muted-foreground">{title}</p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      <div className="mb-1">{content}</div>
      <div>postId : {postId}</div>
      <Separator />
    </li>
  );
};
