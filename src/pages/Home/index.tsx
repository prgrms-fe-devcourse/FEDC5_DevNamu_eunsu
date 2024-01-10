import useThreadStore from "@/stores/thread";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";
import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const HomePage = () => {
  const { user } = useGetUserInfo();
  const { threads, channelId, channelName } = useThreadsByChannel();
  const { selectedThreadId, selectThreadId } = useThreadStore((state) => state);
  const selectedThread = threads?.find((thread) => thread._id === selectedThreadId);

  const handleCloseThreadDetail = () => {
    selectThreadId(null);
  };

  return (
    <div className="relative">
      <div
        className={`duration-600 mt-12 flex flex-col items-center justify-center transition-all ${
          selectedThreadId && "xl:translate-x-[-180px]"
        }`}
      >
        <div className="w-full max-w-4xl px-4">
          <ChannelNavigationMenu />
        </div>
        <div className="w-full max-w-4xl px-4">
          <main>{threads && <ThreadList threads={threads} />}</main>
          {user && (
            <EditorTextArea
              isMention={channelName !== "incompetent"}
              nickname={user.nickname}
              editorProps={{ channelId }}
            />
          )}
        </div>
      </div>
      <div>
        {selectedThread && (
          <ThreadDetailView
            className="fixed right-0 top-0 z-10 bg-white"
            thread={selectedThread}
            onClose={handleCloseThreadDetail}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
