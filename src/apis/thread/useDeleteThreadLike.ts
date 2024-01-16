import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

import { log } from "@/utils/logger";

import { Thread } from "@/types/thread";

import { deleteThreadLike } from "./queryFn";
import threads from "./queryKey";

interface Parameters {
  channelId: string;
  threadId: string;
}

const useDeleteThreadLike = ({ channelId, threadId }: Parameters) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (likeId: string) => deleteThreadLike(likeId),
    onMutate: async (likeId) => {
      await queryClient.cancelQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });
      await queryClient.cancelQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });

      const previousThread = queryClient.getQueryData<Thread>(
        threads.threadDetail(threadId).queryKey,
      );

      const previousThreads = queryClient.getQueryData<Thread[]>(
        threads.threadsByChannel(channelId).queryKey,
      );

      queryClient.setQueryData(
        threads.threadDetail(threadId).queryKey,
        (oldThread: Thread | undefined) => {
          if (!oldThread) return oldThread;

          return {
            ...oldThread,
            likes: oldThread.likes.filter((like) => like._id !== likeId),
          };
        },
      );

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[] | undefined) => {
          if (!oldThreads) return [];

          return oldThreads.map((thread) =>
            thread._id === threadId
              ? { ...thread, likes: thread.likes.filter((like) => like._id !== likeId) }
              : thread,
          );
        },
      );

      return { previousThread, previousThreads };
    },
    onError: (error, likeId, context) => {
      log("info", likeId, context);
      Sentry.captureException(error);

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, context?.previousThread);
      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        context?.previousThreads,
      );
    },

    onSuccess: (likeResponse) => {
      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, (oldThread: Thread) => ({
        ...oldThread,
        likes: oldThread.likes.filter((like) => like._id !== likeResponse._id),
      }));

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[] | undefined) => {
          if (!oldThreads) return [];

          return oldThreads.map((thread) =>
            thread._id === threadId
              ? { ...thread, likes: thread.likes.filter((like) => like._id !== likeResponse._id) }
              : thread,
          );
        },
      );

      queryClient.invalidateQueries({ queryKey: threads.threadDetail(likeResponse.post).queryKey });
      queryClient.invalidateQueries({ queryKey: threads.threadsByChannel(channelId).queryKey });
    },
  });

  return { removeLike: mutate, ...rest };
};

export default useDeleteThreadLike;
