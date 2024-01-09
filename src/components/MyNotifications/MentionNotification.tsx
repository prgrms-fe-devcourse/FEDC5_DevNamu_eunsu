import { formatDate } from "@/utils/formatDate.ts";

import { MyNotificationContent } from "@/components/MyNotifications/MyNotificationItem.tsx";

interface Props {
  message: string;
  createdAt: string;
}

const MentionNotification = ({ message, createdAt }: Props) => {
  const createdDate = formatDate(createdAt);
  const { channelName, postId, content } = JSON.parse(message);

  return (
    <MyNotificationContent
      createdDate={createdDate}
      content={content}
      channelName={channelName}
      postId={postId}
      isMention={true}
    />
  );
};

export default MentionNotification;
