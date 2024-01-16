import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import * as Sentry from "@sentry/react";

import { log } from "@/utils/logger";

import { Like, Thread } from "@/types/thread";

import useGetUserInfo from "../auth/useGetUserInfo";
import { usePostNotification } from "../notification/usePostNotification";

import { postThreadLike } from "./queryFn";
import threads from "./queryKey";

import { NOTIFICATION_TYPES } from "@/constants/notification";

const usePostThreadLike = (channelId: string) => {
  const queryClient = useQueryClient();
  const { user } = useGetUserInfo();
  const { mutate: notificationMutate } = usePostNotification();

  const { mutate, ...rest } = useMutation<
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
    onSuccess: (likeResponse, threadId) => {
      const notificationRequest = {
        notificationType: NOTIFICATION_TYPES.LIKE,
        notificationTypeId: likeResponse._id,
        userId: likeResponse.user,
        postId: likeResponse.post,
      };

      notificationMutate(notificationRequest);

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, (oldThread: Thread) => {
        const filteredLikes = oldThread.likes.filter((like) => like.user !== user?._id);
        return {
          ...oldThread,
          likes: [...filteredLikes, likeResponse],
        };
      });

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        (oldThreads: Thread[] | undefined) => {
          if (!oldThreads) return [];
          return oldThreads.map((thread) =>
            thread._id === threadId
              ? {
                  ...thread,
                  likes: [...thread.likes.filter((like) => like.user !== user?._id), likeResponse],
                }
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

  return { likeThread: mutate, ...rest };
};

export default usePostThreadLike;
