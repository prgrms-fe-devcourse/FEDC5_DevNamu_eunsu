import { useQuery } from "@tanstack/react-query";

import channels from "./queryKey";

const useChannelDetailsQuery = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(channels.channelById(id));

  return {
    channelDetails: data,
    isLoading,
    isError,
    error,
  };
};

export default useChannelDetailsQuery;
