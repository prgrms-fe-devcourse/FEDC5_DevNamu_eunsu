import { createQueryKeys } from "@lukemorales/query-key-factory";

import { Thread } from "@/types/thread";

import { getThreadsByChannelId } from "./queryFn";

const parseFullName = (fullName: string) => {
  try {
    return JSON.parse(fullName);
  } catch (error) {
    console.error("Error parsing fullName:", error);
    return { name: "", nickname: "프롱이" };
  }
};

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
