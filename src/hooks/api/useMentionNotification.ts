import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { usePostMention } from "@/apis/mention/usePostMention.ts";
import { mentionJSONStringify } from "@/lib/editorContent.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";

interface Props {
  channelId: string;
  postId: string;
  mentionUserList: string[];
}
const useMentionNotification = ({ channelId, postId, mentionUserList }: Props) => {
  const { mutateAsync: mentionMutate } = usePostMention();
  const { mutate: notificationMutate } = usePostNotification();

  const mentionNotification = (formValues: FormValues) => {
    if (!formValues) return;

    mentionUserList.forEach(async (mentionUserId) => {
      const mentionRequest = {
        message: mentionJSONStringify({ channelId, postId, content: formValues.content }),
        receiver: mentionUserId,
      };

      const mentionResponse = await mentionMutate(mentionRequest);

      const notificationRequest = {
        notificationType: "MENTION" as NotificationTypes,
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
