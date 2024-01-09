import { Like } from "@/types/thread";

import { usePostNotification } from "@/apis/notification/usePostNotification.ts";
import usePostThreadLike from "@/apis/thread/usePostThreadLike";
import { NOTIFICATION_TYPES } from "@/constants/notification";

const useLikeThread = (channelId: string) => {
  const { likeThread, isPending } = usePostThreadLike(channelId);
  const { mutate: notificationMutate } = usePostNotification();

  const likeAndNotify = ({ threadId, authorId }: { threadId: string; authorId: string }) => {
    likeThread(threadId, {
      onSuccess: (like: Like) => {
        const notificationRequest = {
          notificationType: NOTIFICATION_TYPES.LIKE,
          notificationTypeId: like._id,
          userId: authorId,
          postId: threadId,
        };

        notificationMutate(notificationRequest);
      },
    });
  };

  return { likeAndNotify, isPending };
};

export default useLikeThread;
