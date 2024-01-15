import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { usePostMention } from "@/apis/mention/usePostMention.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import { NOTIFICATION_TYPES } from "@/constants/notification";
import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";

interface MentionNotificationProps {
  content: string;
  postId: string;
  channelName: string;
}

interface Props {
  mentionedList?: UserDBProps[];
}
const useMentionNotification = ({ mentionedList }: Props) => {
  const { mutateAsync: mentionMutate } = usePostMention();
  const { mutate: notificationMutate } = usePostNotification();
  const { user } = useGetUserInfo();
  const { sendMessageBySlackBot } = usePostSlackMessage();

  const mentionNotification = ({ content, postId, channelName }: MentionNotificationProps) => {
    if (!mentionedList) return;

    sendMessageBySlackBot({ mentionedList });

    mentionedList.forEach(async (mentionUser) => {
      const mentionRequest = {
        message: JSON.stringify({
          channelName,
          postId,
          content,
          receiverName: mentionUser.name,
          senderId: user?._id,
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
