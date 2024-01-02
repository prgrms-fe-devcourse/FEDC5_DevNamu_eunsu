import { createQueryKeys } from "@lukemorales/query-key-factory";

import { parseFullName } from "@/utils/\bparsingJson";

import { Thread } from "@/types/thread";

import { getThreadsByChannelId } from "./queryFn";

const threads = createQueryKeys("thread", {
  threadsByChannel: (channelId: string | undefined) => ({
    queryKey: ["threads", channelId],
    queryFn: channelId ? () => getThreadsByChannelId(channelId) : undefined,
    enabled: !!channelId,
    select: (data: Thread[]) =>
      data.map((thread) => {
        const parsedFullName = parseFullName(thread.author.fullName);
        return {
          ...thread,
          author: {
            ...thread.author,
            name: parsedFullName.user,
            nickname: parsedFullName.nickname,
          },
        };
      }),
  }),
});

export default threads;
