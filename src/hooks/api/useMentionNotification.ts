import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { usePostMention } from "@/apis/mention/usePostMention.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface MentionNotificationProps {
  content: string;
  postId: string;
  channelName: string;
}

interface Props {
  mentionList?: UserDBProps[];
}
const useMentionNotification = ({ mentionList }: Props) => {
  const { mutateAsync: mentionMutate } = usePostMention();
  const { mutate: notificationMutate } = usePostNotification();

  const mentionNotification = ({ content, postId, channelName }: MentionNotificationProps) => {
    mentionList?.forEach(async (mentionUser) => {
      const mentionRequest = {
        message: JSON.stringify({ channelName, postId, content }),
        receiver: mentionUser.userId,
      };

      const mentionResponse = await mentionMutate(mentionRequest);

      const notificationRequest = {
        notificationType: "MESSAGE" as NotificationTypes,
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
