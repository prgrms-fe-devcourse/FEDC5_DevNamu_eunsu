import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postThreadLike } from "./queryFn";
import threads from "./queryKey";

const usePostThreadLike = (channelId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (postId: string) => postThreadLike(postId),
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
