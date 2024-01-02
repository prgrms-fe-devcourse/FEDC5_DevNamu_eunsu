import { createQueryKeys } from "@lukemorales/query-key-factory";

import { parseFullName } from "@/utils/parsingJson";

import { Thread } from "@/types/thread";

import { getThreadsByChannelId } from "./queryFn";

const threads = createQueryKeys("thread", {
  threadsByChannel: (channelId: string | undefined) => ({
    queryKey: ["threads", channelId],
    queryFn: channelId ? () => getThreadsByChannelId(channelId) : undefined,
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
});

export default threads;
