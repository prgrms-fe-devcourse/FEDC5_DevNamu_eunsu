import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import useSelectedThreadStore from "@/stores/thread";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";
import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";
import EmptyThread from "@/components/common/myactivate/EmptyThread";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { user } = useGetUserInfo();
  const { threads, channelId, channelName } = useThreadsByChannel();
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  useEffect(() => {
    Sentry.captureMessage(`visit - HomePage: ${channelName}`);
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
          <main className="flex min-h-[calc(100vh-300px)] flex-col rounded-sm border border-t-0 border-solid">
            <div className="flex min-h-full flex-1 items-center justify-center">
              {!threads && (
                <EmptyThread type="threads" className="min-h-[calc(100vh-250px)] w-full" />
              )}
            </div>
            {threads && <ThreadList threads={threads} />}
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
            className="fixed right-0 top-0 bg-white"
            threadId={selectedThreadId}
            onClose={handleCloseThreadDetail}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
