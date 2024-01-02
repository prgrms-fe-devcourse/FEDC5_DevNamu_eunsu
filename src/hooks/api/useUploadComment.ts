import { usePostComment } from "@/apis/comment/useCommentMutate.ts";
import { usePostNotification } from "@/apis/notification/useNotificationMutate.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickName.ts";

interface Props {
  nickName: string | undefined;
  postId: string;
}

const useUploadComment = ({ nickName, postId }: Props) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const { mutate: notificationMutate } = usePostNotification();

  const uploadComment = async ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const commentRequest = {
      comment: JSON.stringify({
        content,
        nickName: anonymous ? ANONYMOUS_NICKNAME : nickName,
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
