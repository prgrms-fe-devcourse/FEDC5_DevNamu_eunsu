import { useMutation, useQueryClient } from "@tanstack/react-query";

import threads from "./queryKey";

import { patchThread } from "@/apis/thread/queryFn.ts";

const usePutThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchThread,
    onSuccess: (threadResponse, parameters) => {
      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(threadResponse.channel?._id).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(parameters.postId).queryKey,
      });
    },
  });
};

export default usePutThread;
