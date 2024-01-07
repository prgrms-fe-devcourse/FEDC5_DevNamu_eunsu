import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createThread } from "@/apis/thread";

import { threadKeys } from "./queryKeyFactory";

// TODO: error handling 공통으로 뺼 것 (2024.01.02)
export const usePostThread = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: threadKeys.threadsByChannelId(channelId),
      });
    },
    onError: () => {},
  });
};
