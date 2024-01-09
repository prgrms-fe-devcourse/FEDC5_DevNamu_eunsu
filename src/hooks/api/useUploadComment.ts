import { usePostComment } from "@/apis/comment/usePostComment.ts";
import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  channelName: string;
  mentionList?: UserDBProps[];
  postAuthorId: string;
}

const useUploadComment = ({ nickname, postId, channelName, mentionList, postAuthorId }: Props) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const { mutate: notificationMutate } = usePostNotification();
  const { mentionNotification } = useMentionNotification({ mentionList });

  const uploadComment = async (formValues: FormValues) => {
    if (!formValues) return;

    const commentRequest = {
      comment: formJSONStringify({ formValues, nickname }),
      postId,
    };

    const commentResponse = await commentMutate(commentRequest);

    const notificationRequest = {
      notificationType: "COMMENT" as NotificationTypes,
      notificationTypeId: commentResponse._id,
      userId: postAuthorId,
      postId,
    };

    notificationMutate(notificationRequest);

    if (!mentionList) return;

    mentionNotification({
      content: formValues.content,
      postId,
      channelName,
    });
  };

  return { uploadComment };
};

export default useUploadComment;
