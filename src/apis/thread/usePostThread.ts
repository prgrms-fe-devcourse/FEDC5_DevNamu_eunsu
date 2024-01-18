import { useMutation, useQueryClient } from "@tanstack/react-query";

import { parseFullName, parseTitleOrComment } from "@/utils/parsingJson";

import { Thread } from "@/types/thread";

import threads from "./queryKey";

import { createThread } from "@/apis/thread/queryFn.ts";

// TODO: error handling 공통으로 뺼 것 (2024.01.02)
export const usePostThread = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThread,
    onSuccess: (postedThread: Thread) => {
      const { name } = parseFullName(postedThread.author.fullName);
      const { content, nickname, mentionedList } = parseTitleOrComment(postedThread.title);

      const parsedPostedThread = {
        ...postedThread,
        content,
        mentionedList,
        nickname,
        author: {
          ...postedThread.author,
          name,
          nickname,
        },
      };

      queryClient.invalidateQueries({
        queryKey: threads.threadsByChannel(channelId).queryKey,
      });

      queryClient.setQueryData(
        threads.threadsByChannel(channelId).queryKey,
        ({ pages, pageParams }: { pages: Thread[][]; pageParams: number[] }) => {
          const updatedPages = [[parsedPostedThread, ...pages[0]]];
          console.log(pages, postedThread);

          return { pages: updatedPages, pageParams };
        },
      );
    },
  });
};
