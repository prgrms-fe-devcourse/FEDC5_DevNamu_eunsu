import useGetMyComments from "@/apis/mythreads/useGetMyComments";
import useGetMyThread from "@/apis/mythreads/useGetMyThread";

const useListedThreadsAndComments = (userId: string) => {
  const { myThreads, isThreadPending } = useGetMyThread(userId);
  const { myComments, isCommentPending } = useGetMyComments(userId);

  const listedThreadsAndComments = [];

  if (myThreads) {
    listedThreadsAndComments.push(...myThreads);
  }
  if (myComments) {
    listedThreadsAndComments.push(...myComments);
  }

  listedThreadsAndComments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return {
    listedThreadsAndComments,
    isPending: isThreadPending || isCommentPending,
  };
};

export default useListedThreadsAndComments;
