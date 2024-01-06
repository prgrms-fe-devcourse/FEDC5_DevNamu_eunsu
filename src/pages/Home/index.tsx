import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import CommonThreadEditor from "@/components/common/Editor";
import useCreateThread from "@/hooks/api/useCreateThread";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

const HomePage = () => {
  const { threads, channelId, channelName } = useThreadsByChannel();
  const createThread = useCreateThread(channelId);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <div className="w-full max-w-4xl px-4">
        <main>{threads && <ThreadList threads={threads} />}</main>
        <CommonThreadEditor
          disableMention={channelName === "incompetent"}
          onSubmit={createThread}
        />
      </div>
    </div>
  );
};

export default HomePage;
