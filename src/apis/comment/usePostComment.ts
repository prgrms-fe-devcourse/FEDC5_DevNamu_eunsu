import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Thread } from "@/types/thread";

import threads from "@/apis/thread/queryKey";
import { createComment } from "@/apis/comment/queryFn.ts";

export const usePostComment = (channelId: string | undefined) => {
  const queryClient = useQueryClient();

  // TODO: [24/1/2] error handling 공통으로 뺼 것
  return useMutation({
    mutationFn: createComment,
    onSuccess: (comment) => {
      queryClient.setQueryData(
        threads.threadDetail(comment.post).queryKey,
        (threadDetail: Thread) => ({
          ...threadDetail,
          comments: [...threadDetail.comments, comment],
        }),
      );

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        ({ pages, pageParams }: { pages: Thread[][]; pageParams: number[] }) => {
          const updatedPages = pages.map((page) =>
            page.map((thread) =>
              thread._id === comment.post
                ? { ...thread, comments: [...thread.comments, comment] }
                : thread,
            ),
          );

          return { pages: updatedPages, pageParams };
        },
      );

      queryClient.invalidateQueries({ queryKey: threads.threadDetail(comment.post).queryKey });
      queryClient.invalidateQueries({ queryKey: threads.threadsByChannel(channelId).queryKey });
    },
  });
};
