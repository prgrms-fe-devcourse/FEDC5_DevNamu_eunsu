import { formatDate } from "@/utils/formatDate.ts";

import { MyNotificationContent } from "@/components/MyNotifications/MyNotificationItem.tsx";

interface Props {
  postId: string;
  comment: string;
  createdAt: string;
}
const CommentNotification = ({ postId, comment, createdAt }: Props) => {
  const createdDate = formatDate(createdAt);
  const { content } = JSON.parse(comment);

  return <MyNotificationContent content={content} createdDate={createdDate} postId={postId} />;
};
export default CommentNotification;
