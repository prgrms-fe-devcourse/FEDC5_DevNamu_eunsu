import { useMutation, useQueryClient } from "@tanstack/react-query";

import threads from "../thread/queryKey";

import { createComment } from "@/apis/comment/queryFn.ts";

export const usePostComment = () => {
  const queryClient = useQueryClient();

  // TODO: [24/1/2] error handling 공통으로 뺼 것
  return useMutation({
    mutationFn: createComment,
    onSuccess: (comment) => {
      queryClient.invalidateQueries({ queryKey: threads.threadDetail(comment.post).queryKey });
    },
    onError: () => {},
  });
};
