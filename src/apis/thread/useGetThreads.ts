import { useQuery } from "@tanstack/react-query";

import { Thread } from "@/types/thread";

import threads from "./queryKey";

const useGetThreads = (channelId: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery<Thread[]>(
    threads.threadsByChannel(channelId),
  );

  return {
    threads: data?.slice().reverse(),
    isLoading,
    isError,
    error,
  };
};

export default useGetThreads;
