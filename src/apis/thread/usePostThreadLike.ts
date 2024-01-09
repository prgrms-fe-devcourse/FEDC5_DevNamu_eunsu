import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Like, Thread } from "@/types/thread";

import useGetUserInfo from "../auth/useGetUserInfo";

import { postThreadLike } from "./queryFn";
import threads from "./queryKey";

const usePostThreadLike = (channelId: string) => {
  const queryClient = useQueryClient();
  const { user } = useGetUserInfo();

  const { mutate, isPending, isError } = useMutation<
    Like,
    Error,
    string,
    { previousThreads: Thread[] | undefined }
  >({
    mutationFn: (threadId: string) => postThreadLike(threadId),
    onMutate: async (threadId) => {
      await queryClient.cancelQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });

      const previousThreads = queryClient.getQueryData<Thread[]>(
        threads.threadsByChannel(channelId).queryKey,
      );

      const optimisticLike = {
        _id: nanoid(),
        post: threadId,
        user: user?._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[]) =>
          oldThreads.map((thread) =>
            thread._id === threadId
              ? { ...thread, likes: [...thread.likes, optimisticLike] }
              : thread,
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
