import { useQuery } from "@tanstack/react-query";

import { getChannels } from "@/apis/channel";

import { channelsKeys } from "./queryKeyFactory";

const useChannelQuery = () => {
  return useQuery({
    queryKey: channelsKeys.allChannels,
    queryFn: getChannels,
  });
};

export default useChannelQuery;
