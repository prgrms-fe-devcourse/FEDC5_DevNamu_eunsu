import { createQueryKeys } from "@lukemorales/query-key-factory";

import { parseFullName } from "@/utils/parsingJson";

import { Thread } from "@/types/thread";

import { getThreadByThreadId, getThreadsByChannelId } from "./queryFn";

const threads = createQueryKeys("thread", {
  threadsByChannel: (channelId: string | undefined) => ({
    queryKey: ["threads", channelId],
    queryFn: channelId ? () => getThreadsByChannelId(channelId, 0) : undefined,
    enabled: !!channelId,
    select: (threads: Thread[]) =>
      threads.map((thread) => {
        const { nickname, name } = parseFullName(thread.author.fullName);

        return {
          ...thread,
          author: {
            ...thread.author,
            name,
            nickname,
          },
        };
      }),
  }),
  threadDetail: (threadId: string | undefined) => ({
    queryKey: ["thread", threadId],
    queryFn: threadId ? () => getThreadByThreadId(threadId) : undefined,
    enabled: !!threadId,
    select: (thread: Thread) => {
      const { nickname, name } = parseFullName(thread.author.fullName);
      return {
        ...thread,
        author: {
          ...thread.author,
          name,
          nickname,
        },
      };
    },
  }),
});

export default threads;
