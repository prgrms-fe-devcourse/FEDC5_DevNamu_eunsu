import { useQueryClient } from "@tanstack/react-query";

import { Comment } from "@/types/thread";

import { usePostComment } from "@/apis/comment/usePostComment.ts";
import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { EditorFormValues } from "@/components/common/Editor/form";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

const useCreateCommentNotification = () => {
  const { mutateAsync: notificationMutate } = usePostNotification();

  const createNotification = (postId: string, comment: Comment) => {
    const requestBody = {
      notificationType: "COMMENT",
      notificationTypeId: comment._id,
      userId: comment.author._id,
      postId,
    } as const;

    return notificationMutate(requestBody);
  };

  return createNotification;
};

const useUploadComment = (postId: string) => {
  const { mutateAsync: commentMutate } = usePostComment();
  const queryClient = useQueryClient();
  const notifyCommentCreated = useCreateCommentNotification();

  const uploadComment = async ({ anonymous, content, nickname }: EditorFormValues) => {
    const requestBody = {
      comment: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      postId,
    };

    const createdComment = await commentMutate(requestBody);

    queryClient.invalidateQueries({
      queryKey: ["thread", postId],
    });

    return notifyCommentCreated(postId, createdComment);
  };

  return uploadComment;
};

export default useUploadComment;
