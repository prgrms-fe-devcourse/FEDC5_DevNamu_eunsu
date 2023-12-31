import { useMutation } from "@tanstack/react-query";

import { createComment } from "@/apis/comment/queryFn.ts";

export const useCreateCommentMutate = () => {
  return useMutation({ mutationFn: createComment, onError: () => {} });
};
