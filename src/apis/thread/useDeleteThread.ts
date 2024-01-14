import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteThread } from "@/apis/thread/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

const useDeleteThread = (channelId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
  });

  return {
    deleteThread: mutate,
    isPending,
    isError,
  };
};

export default useDeleteThread;
