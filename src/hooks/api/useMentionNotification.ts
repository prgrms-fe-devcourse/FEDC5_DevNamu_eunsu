import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { usePostMention } from "@/apis/mention/usePostMention.ts";
import { NOTIFICATION_TYPES } from "@/constants/notification";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface MentionNotificationProps {
  mentionedList?: UserDBProps[];
  content: string;
  postId: string;
  channelName: string;
}

const useMentionNotification = () => {
  const { mutateAsync: mentionMutate } = usePostMention();
  const { mutate: notificationMutate } = usePostNotification();

  const mentionNotification = ({
    mentionedList,
    content,
    postId,
    channelName,
  }: MentionNotificationProps) => {
    if (!mentionedList) return;

    mentionedList.forEach(async (mentionUser) => {
      const mentionRequest = {
        message: JSON.stringify({
          channelName,
          postId,
          content,
          receiverName: mentionUser.name,
        }),
        receiver: mentionUser.userId,
      };

      const mentionResponse = await mentionMutate(mentionRequest);

      const notificationRequest = {
        notificationType: NOTIFICATION_TYPES.MESSAGE,
        notificationTypeId: mentionResponse._id,
        userId: mentionResponse.sender._id,
        postId,
      };

      notificationMutate(notificationRequest);
    });
  };

  return { mentionNotification };
};

export default useMentionNotification;
