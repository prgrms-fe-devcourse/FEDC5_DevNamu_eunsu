import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/apis/comment/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

const useDeleteComment = (threadId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, ...props } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });
    },
  });

  return { deleteComment: mutate, ...props };
};

export default useDeleteComment;
