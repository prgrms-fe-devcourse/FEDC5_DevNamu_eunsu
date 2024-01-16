import { useLocation } from "react-router-dom";

import useGetChannelDetails from "@/apis/channel/useGetChannelDetails";
import useGetThreads from "@/apis/thread/useGetThreads";

const useThreadsByChannel = () => {
  const location = useLocation();
  const channelName = location.pathname.split("/").pop() || "compliment";

  const channelQuery = useGetChannelDetails(channelName);
  const threadsQuery = useGetThreads(
    channelQuery.channelDetails?._id,
    channelQuery.channelDetails?.posts.length || 0,
  );

  console.log("threadsQuery", threadsQuery);

  return {
    channelName,
    totalThreads: channelQuery.channelDetails?.posts.length || 0,
    channelId: channelQuery.channelDetails?._id || "",
    isChannelLoading: channelQuery.isLoading,
    isChannelError: channelQuery.isError,
    channelError: channelQuery.error,
    threads: threadsQuery.threads,
    fetchNextPage: threadsQuery.fetchNextPage,
    hasNextPage: threadsQuery.hasNextPage,
    isFetchingNextPage: threadsQuery.isFetchingNextPage,
    isThreadsLoading: threadsQuery.isPending,
    isThreadsError: threadsQuery.isError,
    threadsError: threadsQuery.error,
  };
};

export default useThreadsByChannel;
