import { useCreateCommentMutate } from "@/apis/comment/useCommentMutate.ts";
import { useCreateNotificationMutate } from "@/apis/notification/useNotificationMutate.ts";
import { CreateNotification } from "@/apis/notification/queryFn.ts";

interface Props {
  userName: string | undefined;
  postId: string;
}

const useUploadComment = ({ userName, postId }: Props) => {
  const { mutateAsync: commentMutate } = useCreateCommentMutate();
  const { mutate: notificationMutate } = useCreateNotificationMutate();

  const uploadComment = async ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const commentReq = {
      comment: {
        content,
        userName: anonymous ? undefined : userName,
      },
      postId,
    };
    const commentRes = await commentMutate(commentReq);

    const notificationReq = {
      notificationType: "COMMENT",
      notificationTypeId: commentRes._id,
      userId: commentRes.author._id,
      postId,
    };
    notificationMutate(notificationReq as CreateNotification);
  };

  return { uploadComment };
};

export default useUploadComment;
