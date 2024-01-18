import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Comment, Thread } from "@/types/thread";

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
    onSuccess: (deletedComment: Comment) => {
      queryClient.invalidateQueries({
        queryKey: threads.threadDetail(threadId).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });

      queryClient.setQueryData(threads.threadDetail(threadId).queryKey, (threadDetail: Thread) => ({
        ...threadDetail,
        comments: threadDetail.comments.filter((comment) => comment._id !== deletedComment._id),
      }));

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        ({ pages, pageParams }: { pages: Thread[][]; pageParams: number[] }) => {
          const updatedPages = pages.map((page) =>
            page.map((thread) =>
              thread._id === deletedComment.post
                ? {
                    ...thread,
                    comments: thread.comments.filter(
                      (comment) => comment._id !== deletedComment._id,
                    ),
                  }
                : thread,
            ),
          );

          return { pages: updatedPages, pageParams };
        },
      );
    },
  });

  return { deleteComment: mutate, ...props };
};

export default useDeleteComment;
