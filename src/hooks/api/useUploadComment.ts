import { usePostComment } from "@/apis/comment/usePostComment.ts";
import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";
import { NOTIFICATION_TYPES } from "@/constants/notification";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  channelName: string;
  mentionedList?: UserDBProps[];
  postAuthorId: string;
}

const useUploadComment = ({
  nickname,
  postId,
  channelName,
  mentionedList,
  postAuthorId,
}: Props) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const { mutate: notificationMutate } = usePostNotification();
  const { mentionNotification } = useMentionNotification({ mentionedList });
  const { sendMessageBySlackBot } = usePostSlackMessage();

  const uploadComment = async (formValues: FormValues) => {
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
