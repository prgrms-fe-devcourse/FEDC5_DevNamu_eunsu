import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadCreateEditor from "@/components/Home/ThreadCreateEditor";
import ThreadList from "@/components/Home/ThreadList";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

const HomePage = () => {
  const { threads, channelId, channelName } = useThreadsByChannel();

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <div className="w-full max-w-4xl px-4">
        <main>{threads && <ThreadList threads={threads} />}</main>
        <ThreadCreateEditor disableMention={channelName === "incompetent"} channelId={channelId} />
      </div>
    </div>
  );
};

export default HomePage;
