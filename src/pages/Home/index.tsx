import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import useSelectedThreadStore from "@/stores/thread";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";
import ThreadListSkeleton from "@/components/Skelton/ThreadListSkeleton";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { threads, channelId, channelName } = useThreadsByChannel();

  const { user } = useGetUserInfo();
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  useEffect(() => {
    Sentry.captureMessage(`visit - HomePage: ${channelName}`, "info");
  }, [channelName]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={cn(
          "duration-600 mt-12 flex flex-col items-center justify-center transition",
          selectedThreadId ? "xl:translate-x-[-180px]" : "",
        )}
      >
        <div className="w-full max-w-4xl px-4">
          <ChannelNavigationMenu />
        </div>

        <div className="w-full max-w-4xl px-4">
          <main className="border-layer-4 flex min-h-[calc(100vh-300px)] flex-col rounded-sm border border-t-0">
            <div className="flex items-center justify-center">
              {!threads && <ThreadListSkeleton count={10} />}
            </div>
            {threads && threads?.length !== 0 && <ThreadList threads={threads} />}
          </main>
          <EditorTextArea
            isMention={channelName !== "incompetent"}
            nickname={user?.nickname || "익명의 프롱이"}
            editorProps={{ channelId }}
          />
        </div>
      </div>

      <div>
        {selectedThreadId && (
          <ThreadDetailView
            className="fixed right-0 top-0"
            threadId={selectedThreadId}
            onClose={handleCloseThreadDetail}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
