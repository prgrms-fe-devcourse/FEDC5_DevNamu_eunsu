import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getThreadsByChannelId } from "./queryFn";

const threads = createQueryKeys("thread", {
  threadsByChannel: (channelId: string | undefined) => ({
    queryKey: ["threads", channelId],
    queryFn: channelId ? () => getThreadsByChannelId(channelId) : undefined,
    enabled: !!channelId,
  }),
});

export default threads;
