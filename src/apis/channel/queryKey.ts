import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getChannels } from "./channel";

const channels = createQueryKeys("channel", {
  allChannels: {
    queryKey: ["channels"],
    queryFn: getChannels,
  },
});

export default channels;
