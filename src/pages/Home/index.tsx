import { useLocation } from "react-router-dom";

import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import useChannelDetailsQuery from "@/apis/channel/useChannelDetailsQuery";
import useThreadsQuery from "@/apis/thread/useThreadsQuery";
import ThreadList from "@/components/Home/ThreadList";

const HomePage = () => {
  const location = useLocation();

  const channelName = location.pathname.split("/").pop() || "compliment";
  const channelQuery = useChannelDetailsQuery(channelName);
  const threadsQuery = useThreadsQuery(channelQuery.channelDetails?._id);

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <div>{threadsQuery.threads && <ThreadList threads={threadsQuery.threads} />}</div>
    </div>
  );
};

export default HomePage;
