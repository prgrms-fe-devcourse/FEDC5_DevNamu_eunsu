import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Thread } from "@/types/thread";

import { deleteThread } from "@/apis/thread/queryFn.ts";
import threads from "@/apis/thread/queryKey.ts";

const useDeleteThread = (channelId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteThread,
    onSuccess: (deleteThread: Thread) => {
      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        ({ pages, pageParams }: { pages: Thread[][]; pageParams: number[] }) => {
          const updatedPages = pages[0].filter((thread) => thread._id !== deleteThread._id);

          return {
            pages: [updatedPages],
            pageParams,
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });
    },
  });

  return { deleteThread: mutate, ...rest };
};

export default useDeleteThread;
