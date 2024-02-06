import { usePostComment } from "@/apis/comment/usePostComment.ts";
import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { formJSONStringify } from "@/lib/editorContent.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";
import { NOTIFICATION_TYPES } from "@/constants/notification";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  channelId: string;
  channelName: string;
  postAuthorId: string;
}

const useUploadComment = ({ nickname, postId, channelId, channelName, postAuthorId }: Props) => {
  const { mutateAsync: commentMutate } = usePostComment(channelId);
  const { mutate: notificationMutate } = usePostNotification();
  const { mentionNotification } = useMentionNotification();
  const { sendMessageBySlackBot } = usePostSlackMessage();

  const uploadComment = async ({ formValues, mentionedList }: FormSubmitProps) => {
    if (!formValues) return;

    const commentRequest = {
      comment: formJSONStringify({ formValues, nickname, mentionedList }),
      postId,
    };

    const commentResponse = await commentMutate(commentRequest);

    const notificationRequest = {
      notificationType: NOTIFICATION_TYPES.COMMENT,
      notificationTypeId: commentResponse._id,
      userId: postAuthorId,
      postId,
    };

    notificationMutate(notificationRequest);

    if (!mentionedList) return;

    mentionNotification({
      content: formValues.content,
      postId,
      channelName,
    });

    sendMessageBySlackBot({ mentionedList });
  };

  return { uploadComment };
};

export default useUploadComment;
