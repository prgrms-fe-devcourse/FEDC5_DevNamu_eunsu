import { useQuery } from "@tanstack/react-query";

import channels from "./queryKey";

const useChannelQuery = () => {
  return useQuery(channels.allChannels);
};

export default useChannelQuery;
