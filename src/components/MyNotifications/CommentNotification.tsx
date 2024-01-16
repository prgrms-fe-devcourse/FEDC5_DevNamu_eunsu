import { formatDateFns } from "@/utils/formatDateFns";

import { MyNotificationContent } from "@/components/MyNotifications/MyNotificationItem.tsx";

interface Props {
  postId: string;
  comment: string;
  createdAt: string;
}
const CommentNotification = ({ postId, comment, createdAt }: Props) => {
  const createdDate = formatDateFns(createdAt);
  let content = "";
  try {
    content = JSON.parse(comment).content;
  } catch (e) {
    content = "댓글이 삭제되었습니다.";
  }
  return <MyNotificationContent content={content} createdDate={createdDate} postId={postId} />;
};
export default CommentNotification;
