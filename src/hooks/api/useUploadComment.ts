import { usePostComment } from "@/apis/comment/usePostComment.ts";
import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
}

const useUploadComment = ({ nickname, postId }: Props) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const { mutate: notificationMutate } = usePostNotification();
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
      userId: commentResponse.author._id,
      postId,
    };
    notificationMutate(notificationRequest);
  };

  return { uploadComment };
};

export default useUploadComment;
