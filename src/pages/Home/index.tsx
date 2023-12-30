import { useLocation } from "react-router-dom";

import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import useChannelDetailsQuery from "@/apis/channel/useChannelDetailsQuery";
import useThreadsQuery from "@/apis/thread/useThreadsQuery";

const HomePage = () => {
  const location = useLocation();

  const channelName = location.pathname.split("/").pop() || "compliment";
  const channelQuery = useChannelDetailsQuery(channelName);
  const threadsQuery = useThreadsQuery(channelQuery.channelDetails?._id);

  console.log(threadsQuery);

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
    </div>
  );
};

export default HomePage;
