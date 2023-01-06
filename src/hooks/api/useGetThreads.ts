import { useQuery } from "@tanstack/react-query";

import { getThreadsByChannelId } from "@/apis/thread";

import { Thread } from "@/types/thread";

import { threadKeys } from "./queryKeyFactory";

const useGetThreads = (channelId: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery<Thread[]>({
    queryKey: threadKeys.threadsByChannelId(channelId),
    queryFn: channelId ? () => getThreadsByChannelId(channelId) : undefined,
    enabled: !!channelId,
  });

  return {
    threads: data?.slice().reverse(),
    isLoading,
    isError,
    error,
  };
};

export default useGetThreads;
