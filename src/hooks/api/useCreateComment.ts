import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Comment } from "@/types/thread";
import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import { postComment } from "@/apis/comment/queryFn";

const useCreateCommentNotification = () => {
  const { mutateAsync: notificationMutate } = usePostNotification();

  // ?? 내가 쓴 댓글에 내가 알람을 받나요?
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

const useCreateComment = (postId: string) => {
  const { mutateAsync: commentMutate } = useMutation({ mutationFn: postComment });
  const queryClient = useQueryClient();
  const notifyCommentCreated = useCreateCommentNotification();

  const uploadComment = async (payload: ThreadCommonPayload) => {
    const createdComment = await commentMutate({ postId, payload });

    queryClient.invalidateQueries({
      queryKey: ["thread", postId],
    });

    return notifyCommentCreated(postId, createdComment);
  };

  return uploadComment;
};

export default useCreateComment;
