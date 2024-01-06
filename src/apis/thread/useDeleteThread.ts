import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteThread } from "@/apis/thread/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

const useDeleteThread = (channelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
    onError: () => {},
  });
};

export default useDeleteThread;
