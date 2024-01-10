import useThreadStore from "@/stores/thread";

import MyThreadDescription from "@/components/MyThreads/MyThreadDescription";
import MyThreadBody from "@/components/MyThreads/MyThreadBody";
import useGetThread from "@/apis/thread/useGetThread";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const MyThreadsPage = () => {
  const { selectedThreadId, selectThreadId } = useThreadStore((state) => state);
  const { thread } = useGetThread(selectedThreadId);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  return (
    <div className="relative h-screen overflow-auto p-30pxr">
      <MyThreadDescription />
      <MyThreadBody />
      {thread && (
        <ThreadDetailView
          thread={thread}
          onClose={handleCloseThreadDetail}
          className="fixed right-0 top-0 bg-white"
        />
      )}
    </div>
  );
};

export default MyThreadsPage;
