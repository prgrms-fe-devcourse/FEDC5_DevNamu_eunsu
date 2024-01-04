import { usePostComment } from "@/apis/comment/useCommentMutate.ts";
import { usePostNotification } from "@/apis/notification/useNotificationMutate.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickName.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
}

const useUploadComment = ({ nickname, postId }: Props) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const { mutate: notificationMutate } = usePostNotification();

  const uploadComment = async ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const commentRequest = {
      comment: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      postId,
    };

    const commentRes = await commentMutate(commentRequest);

    const notificationReq = {
      notificationType: "COMMENT" as NotificationTypes,
      notificationTypeId: commentRes._id,
      userId: commentRes.author._id,
      postId,
    };
    notificationMutate(notificationReq);
  };

  return { uploadComment };
};

export default useUploadComment;
