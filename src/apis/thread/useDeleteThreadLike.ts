import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteThreadLike } from "./queryFn";
import threads from "./queryKey";

const useDeleteThreadLike = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    // TODO: optimistic updates 구현 (2024.01.09)
    mutationFn: (likeId: string) => deleteThreadLike(likeId),
    onSuccess: (like) => {
      queryClient.invalidateQueries({ queryKey: threads.threadDetail(like.post).queryKey });
    },
  });

  return {
    removeLike: mutate,
    isPending,
    isError,
  };
};

export default useDeleteThreadLike;
