import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/apis/comment/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

const useDeleteComment = (threadId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });
    },
    onError: () => {},
  });
};

export default useDeleteComment;
