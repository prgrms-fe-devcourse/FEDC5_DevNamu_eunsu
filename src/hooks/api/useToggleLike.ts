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
      gtag("event", "ui사용_좋아요_등록");
    }

    if (likeId) {
      removeLike(likeId);
      gtag("event", "ui사용_좋아요_삭제");
    }
  };

  return { toggleLike, isLikePending, isUnLikePending };
};

export default useToggleLike;
