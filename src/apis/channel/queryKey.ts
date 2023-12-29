import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getChannels } from "./queryFn";

const channels = createQueryKeys("channel", {
  allChannels: {
    queryKey: ["channels"],
    queryFn: getChannels,
  },
});

export default channels;
