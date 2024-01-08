import { useMutation } from "@tanstack/react-query";

import { postThreadLike } from "./queryFn";

const usePostThreadLike = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (postId: string) => postThreadLike(postId),
  });

  return {
    likeThread: mutate,
    isPending,
    isError,
  };
};

export default usePostThreadLike;
