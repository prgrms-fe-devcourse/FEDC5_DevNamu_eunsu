import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Thread } from "@/types/thread";

import { postThreadLike } from "./queryFn";
import threads from "./queryKey";

const usePostThreadLike = (channelId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (threadId: string) => postThreadLike(threadId),
    onMutate: async (threadId) => {
      await queryClient.cancelQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });

      const previousThreads = queryClient.getQueryData(
        threads.threadsByChannel(channelId).queryKey,
      );

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[]) =>
          oldThreads.map((thread) =>
            thread._id === threadId ? { ...thread, likes: [...thread.likes, threadId] } : thread,
          ),
      );

      return { previousThreads };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        context?.previousThreads,
      );

      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
  });

  return {
    likeThread: mutate,
    isPending,
    isError,
  };
};

export default usePostThreadLike;
