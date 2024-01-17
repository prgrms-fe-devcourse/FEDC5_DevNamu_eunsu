import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/apis/comment/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

interface Parameters {
  threadId: string | undefined;
  channelId: string | undefined;
}

const useDeleteComment = ({ threadId, channelId }: Parameters) => {
  const queryClient = useQueryClient();

  const { mutate, ...props } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
  });

  return { deleteComment: mutate, ...props };
};

export default useDeleteComment;
