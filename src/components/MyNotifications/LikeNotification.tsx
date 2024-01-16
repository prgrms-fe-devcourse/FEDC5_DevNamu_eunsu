import { formatDateFns } from "@/utils/formatDateFns";

import { LikeByNotification } from "@/types/thread";

import { MyNotificationContent } from "@/components/MyNotifications/MyNotificationItem.tsx";

interface Props {
  createdAt: string;
  like: LikeByNotification;
}

const LikeNotification = ({ createdAt, like }: Props) => {
  const createdDate = formatDateFns(createdAt);

  const { content } = JSON.parse(like.post.title);

  return (
    <MyNotificationContent
      createdDate={createdDate}
      content={content}
      postId={like.post._id}
      isLike={true}
    />
  );
};

export default LikeNotification;
