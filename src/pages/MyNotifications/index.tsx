import useThreadStore from "@/stores/thread";

import MyNotificationTitle from "@/components/MyNotifications/MyNotificationTitle";
import MyNotificationBody from "@/components/MyNotifications/MyNotificationBody";
import useGetThread from "@/apis/thread/useGetThread";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const MyNotificationsPage = () => {
  const { selectedThreadId, selectThreadId } = useThreadStore((state) => state);
  const { thread } = useGetThread(selectedThreadId);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  return (
    <div className="h-screen overflow-auto p-30pxr">
      <MyNotificationTitle />
      <MyNotificationBody />
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

export default MyNotificationsPage;
