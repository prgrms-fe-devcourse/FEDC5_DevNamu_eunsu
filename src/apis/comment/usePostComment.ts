import { useMutation, useQueryClient } from "@tanstack/react-query";

import threads from "@/apis/thread/queryKey";
import { createComment } from "@/apis/comment/queryFn.ts";

export const usePostComment = (channelId: string | undefined) => {
  const queryClient = useQueryClient();

  // TODO: [24/1/2] error handling 공통으로 뺼 것
  return useMutation({
    mutationFn: createComment,
    onSuccess: (comment) => {
      queryClient.invalidateQueries({ queryKey: threads.threadDetail(comment.post).queryKey });
      queryClient.invalidateQueries({ queryKey: threads.threadsByChannel(channelId).queryKey });
    },
  });
};
