import { useLocation } from "react-router-dom";

import useChannelDetailsQuery from "@/apis/channel/useChannelDetailsQuery";
import useThreadsQuery from "@/apis/thread/useGetThreads";

const useThreadsByChannel = () => {
  const location = useLocation();
  const channelName = location.pathname.split("/").pop() || "compliment";

  const channelQuery = useChannelDetailsQuery(channelName);
  const threadsQuery = useThreadsQuery(channelQuery.channelDetails?._id);

  return {
    channelName,
    channelId: channelQuery.channelDetails?._id || "",
    isChannelLoading: channelQuery.isLoading,
    isChannelError: channelQuery.isError,
    channelError: channelQuery.error,
    threads: threadsQuery.threads,
    isThreadsLoading: threadsQuery.isLoading,
    isThreadsError: threadsQuery.isError,
    threadsError: threadsQuery.error,
  };
};

export default useThreadsByChannel;
