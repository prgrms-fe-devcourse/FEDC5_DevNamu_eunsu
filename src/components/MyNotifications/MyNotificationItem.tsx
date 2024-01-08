import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

interface Props {
  postId: string;
  comment?: string;
  follow?: string;
  message?: string;
  createdAt: string;
}

const MyNotificationItem = ({ comment, message, postId, createdAt }: Props) => {
  const createdDate = formatDate(createdAt);

  if (comment) {
    const commentBody = JSON.parse(comment);
    const { content } = commentBody;
    return <MyNotificationContent content={content} createdDate={createdDate} postId={postId} />;
  } else if (message) {
    const messageBody = JSON.parse(message);
    const { channelName, postId: mentionPostId, content } = messageBody;
    return (
      <MyNotificationContent
        createdDate={createdDate}
        content={content}
        channelName={channelName}
        postId={mentionPostId}
      />
    );
  }
};

export default MyNotificationItem;

interface MyNotificationContentProps {
  createdDate: string;
  content: string;
  channelName?: string;
  postId: string;
}
const MyNotificationContent = ({
  createdDate,
  content,
  channelName,
  postId,
}: MyNotificationContentProps) => {
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
