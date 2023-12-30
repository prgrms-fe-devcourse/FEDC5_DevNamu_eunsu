import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getChannelById, getChannels } from "./queryFn";

const channels = createQueryKeys("channel", {
  allChannels: {
    queryKey: ["channels"],
    queryFn: getChannels,
  },
  channelById: (id: string) => ({
    queryKey: ["channels", id],
    queryFn: () => getChannelById(id),
  }),
});

export default channels;
