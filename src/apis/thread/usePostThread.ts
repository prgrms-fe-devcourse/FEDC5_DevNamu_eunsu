import { useMutation, useQueryClient } from "@tanstack/react-query";

import threads from "./queryKey";

import { createThread } from "@/apis/thread/queryFn.ts";

// TODO: error handling 공통으로 뺼 것 (2024.01.02)
export const usePostThread = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
    onError: () => {},
  });
};
