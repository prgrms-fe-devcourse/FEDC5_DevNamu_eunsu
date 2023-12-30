import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getThreadsByChannelId } from "./queryFn";

const threads = createQueryKeys("thread", {
  threadsByChannel: (channelId: string) => ({
    queryKey: ["threads", channelId],
    queryFn: () => getThreadsByChannelId(channelId),
  }),
});

export default threads;
