import { useQuery } from "@tanstack/react-query";

import { getChannels } from "@/apis/channel";

import { channelsKeys } from "@/hooks/api/queryKeyFactory";

const useChannelQuery = () => {
  return useQuery({
    queryKey: channelsKeys.allChannels,
    queryFn: getChannels,
  });
};

export default useChannelQuery;
