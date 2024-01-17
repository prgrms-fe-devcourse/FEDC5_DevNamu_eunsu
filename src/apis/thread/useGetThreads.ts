import { useInfiniteQuery } from "@tanstack/react-query";

import { getThreadsByChannelId } from "./queryFn";
import threads from "./queryKey";

const useGetThreads = (channelId: string | undefined, totalThreads: number) => {
  console.log(totalThreads);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } =
    useInfiniteQuery({
      queryKey: threads.threadsByChannel(channelId).queryKey,
      queryFn: channelId
        ? ({ pageParam = 0 }) => getThreadsByChannelId(channelId, pageParam)
        : undefined,
      enabled: !!channelId && !!totalThreads,
      getNextPageParam: (lastPage) => {
        if (!lastPage[0]) return;

        const nextPageOffset = lastPage[0].nextPage;
        if (nextPageOffset > totalThreads) return undefined;
        return nextPageOffset;
      },
      initialPageParam: 0,
    });

  return {
    threads: data?.pages.flatMap((page) => page),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  };
};

export default useGetThreads;
