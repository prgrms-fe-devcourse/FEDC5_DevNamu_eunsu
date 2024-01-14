import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import * as Sentry from "@sentry/react";

import { log } from "@/utils/logger";

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
    { previousThread: Thread | undefined; previousThreads: Thread[] | undefined }
  >({
    mutationFn: (threadId: string) => postThreadLike(threadId),
    onMutate: async (threadId) => {
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

      const optimisticLike = {
        _id: nanoid(),
        post: threadId,
        user: user?._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, (oldThread: Thread) => ({
        ...oldThread,
        likes: oldThread ? [...oldThread.likes, optimisticLike] : [optimisticLike],
      }));

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[] | undefined) => {
          if (!oldThreads) return [];

          return oldThreads.map((thread) =>
            thread._id === threadId
              ? { ...thread, likes: [...thread.likes, optimisticLike] }
              : thread,
          );
        },
      );

      return { previousThread, previousThreads };
    },
    onError: (error, threadId, context) => {
      log("info", threadId, context);

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, context?.previousThread);
      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        context?.previousThreads,
      );

      Sentry.captureException(error);
    },
    onSuccess: (like, threadId) => {
      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, (oldThread: Thread) => {
        const filteredLikes = oldThread.likes.filter((l) => l.user !== user?._id);
        return {
          ...oldThread,
          likes: [...filteredLikes, like],
        };
      });

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[] | undefined) => {
          if (!oldThreads) return [];
          return oldThreads.map((thread) =>
            thread._id === threadId
              ? { ...thread, likes: [...thread.likes.filter((l) => l.user !== user?._id), like] }
              : thread,
          );
        },
      );

      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });

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
