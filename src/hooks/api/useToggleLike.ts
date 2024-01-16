import * as Sentry from "@sentry/react";

import usePostThreadLike from "@/apis/thread/usePostThreadLike";
import useDeleteThreadLike from "@/apis/thread/useDeleteThreadLike";

interface Parameters {
  channelId: string;
  threadId: string;
}

const useToggleLike = ({ channelId, threadId }: Parameters) => {
  const { likeThread, isPending: isLikePending } = usePostThreadLike(channelId);
  const { removeLike, isPending: isUnLikePending } = useDeleteThreadLike({ channelId, threadId });

  const toggleLike = (likeId: string | undefined) => {
    if (isLikePending || isUnLikePending) return;

    if (!likeId) {
      likeThread(threadId);
      Sentry.captureMessage("ui 사용 - 좋아요 등록", "info");
    }

    if (likeId) {
      removeLike(likeId);
      Sentry.captureMessage("ui 사용 - 좋아요 삭제", "info");
    }
  };

  return { toggleLike, isLikePending, isUnLikePending };
};

export default useToggleLike;
