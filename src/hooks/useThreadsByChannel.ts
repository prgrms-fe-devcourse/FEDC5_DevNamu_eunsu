import { useLocation } from "react-router-dom";

import useGetChannelDetails from "@/hooks/api/useGetChannelDetails";
import useGetThreads from "@/hooks/api/useGetThreads";

const useThreadsByChannel = () => {
  const location = useLocation();
  const channelName = location.pathname.split("/").pop() || "compliment";

  // TODO: main merge전 channelName으로 수정해서 올리기 (2024.01.03)
  const channelQuery = useGetChannelDetails(channelName === "demo" ? "compliment" : channelName);
  const threadsQuery = useGetThreads(channelQuery.channelDetails?._id);

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
