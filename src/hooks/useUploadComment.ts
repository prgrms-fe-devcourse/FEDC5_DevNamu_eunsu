import { useCreateCommentMutate } from "@/apis/comment/useCommentMutate.ts";
import { useCreateNotificationMutate } from "@/apis/notification/useNotificationMutate.ts";
import { NotificationTypes } from "@/apis/notification/queryFn.ts";

interface Props {
  nickName: string | undefined;
  postId: string;
}
const useUploadComment = ({ nickName, postId }: Props) => {
  const { mutateAsync: commentMutate } = useCreateCommentMutate();
  const { mutate: notificationMutate } = useCreateNotificationMutate();

  const uploadComment = async ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const commentReq = {
      comment: JSON.stringify({
        content,
        nickName: anonymous ? undefined : nickName,
      }),
      postId,
    };

    const commentRes = await commentMutate(commentReq);

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
