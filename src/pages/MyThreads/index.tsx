import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import useSelectedThreadStore from "@/stores/thread";

import MyThreadDescription from "@/components/MyThreads/MyThreadDescription";
import MyThreadBody from "@/components/MyThreads/MyThreadBody";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const MyThreadsPage = () => {
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };
  useEffect(() => {
    Sentry.captureMessage("visit - MyThreadsPage");
  }, []);

  return (
    <div className="relative h-screen overflow-auto p-30pxr">
      <MyThreadDescription />
      <MyThreadBody />
      {selectedThreadId && (
        <ThreadDetailView
          threadId={selectedThreadId}
          onClose={handleCloseThreadDetail}
          className="fixed right-0 top-0 bg-white"
        />
      )}
    </div>
  );
};

export default MyThreadsPage;
