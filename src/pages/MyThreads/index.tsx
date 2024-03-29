import useSelectedThreadStore from "@/stores/thread";

import MyThreadDescription from "@/components/MyThreads/MyThreadDescription";
import MyThreadBody from "@/components/MyThreads/MyThreadBody";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const MyThreadsPage = () => {
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  return (
    <div className="relative h-screen overflow-auto p-30pxr">
      <MyThreadDescription />
      <MyThreadBody />
      {selectedThreadId && (
        <ThreadDetailView
          threadId={selectedThreadId}
          onClose={handleCloseThreadDetail}
          className="fixed right-0 top-0"
        />
      )}
    </div>
  );
};

export default MyThreadsPage;
