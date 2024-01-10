import { formatDate } from "@/utils/formatDate.ts";

import { LikeByNotification } from "@/types/thread";

import { MyNotificationContent } from "@/components/MyNotifications/MyNotificationItem.tsx";

interface Props {
  createdAt: string;
  like: LikeByNotification;
}

const LikeNotification = ({ createdAt, like }: Props) => {
  const createdDate = formatDate(createdAt);

  const { content } = JSON.parse(like.post.title);

  return <MyNotificationContent createdDate={createdDate} content={content} isLike={true} />;
};

export default LikeNotification;
