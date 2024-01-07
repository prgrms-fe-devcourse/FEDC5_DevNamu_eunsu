import { useQuery } from "@tanstack/react-query";

import { getChannelById } from "@/apis/channel";

import { channelsKeys } from "./queryKeyFactory";

const useChannelDetailsQuery = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: channelsKeys.channelById(id),
    queryFn: () => getChannelById(id),
  });

  return {
    channelDetails: data,
    isLoading,
    isError,
    error,
  };
};

export default useChannelDetailsQuery;
