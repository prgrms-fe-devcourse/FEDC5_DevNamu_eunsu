import { useLocation } from "react-router-dom";

import useChannelDetailsQuery from "@/apis/channel/useChannelDetailsQuery";
import useThreadsQuery from "@/apis/thread/useThreadsQuery";

const useThreadsByChannel = () => {
  const location = useLocation();
  const channelName = location.pathname.split("/").pop() || "compliment";

  // TODO: main merge전 channelName으로 수정해서 올리기 (2024.01.03)
  const channelQuery = useChannelDetailsQuery(channelName === "demo" ? "compliment" : channelName);
  const threadsQuery = useThreadsQuery(channelQuery.channelDetails?._id);

  return {
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
