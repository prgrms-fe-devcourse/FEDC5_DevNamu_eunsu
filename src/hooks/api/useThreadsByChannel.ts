import { useLocation } from "react-router-dom";

import useGetChannelDetails from "@/apis/channel/useGetChannelDetails";
import useGetThreads from "@/apis/thread/useGetThreads";

const useThreadsByChannel = () => {
  const location = useLocation();
  const channelName = location.pathname.split("/").pop() || "compliment";

  const channelQuery = useGetChannelDetails(channelName);
  const threadsQuery = useGetThreads(channelQuery.channelDetails?._id, channelQuery.totalThread);

  return {
    channelName,
    channelId: channelQuery.channelDetails?._id || "",
    isChannelLoading: channelQuery.isLoading,
    isChannelError: channelQuery.isError,
    channelError: channelQuery.error,
    threads: threadsQuery.threads,
    isFetchingNextPage: threadsQuery.isFetchingNextPage,
    fetchNextPage: threadsQuery.fetchNextPage,
    hasNextPage: threadsQuery.hasNextPage,
    isThreadsPending: threadsQuery.isPending,
    isThreadsError: threadsQuery.isError,
    threadsError: threadsQuery.error,
    refetch: threadsQuery.refetch,
  };
};

export default useThreadsByChannel;
