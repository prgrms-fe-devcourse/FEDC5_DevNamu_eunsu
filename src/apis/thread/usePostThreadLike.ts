import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

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
    { previousThread: Thread | undefined }
  >({
    mutationFn: (threadId: string) => postThreadLike(threadId),
    onMutate: async (threadId) => {
      await queryClient.cancelQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });

      const previousThread = queryClient.getQueryData<Thread>(
        threads.threadDetail(threadId).queryKey,
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
        likes: [...oldThread.likes, optimisticLike],
      }));

      return { previousThread };
    },
    onError: (error, threadId, context) => {
      console.log(threadId, context);

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, context?.previousThread);

      console.error(error);
    },
    onSuccess: (_, threadId) => {
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
