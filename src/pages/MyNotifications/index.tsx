import useSelectedThreadStore from "@/stores/thread";

import MyNotificationTitle from "@/components/MyNotifications/MyNotificationTitle";
import MyNotificationBody from "@/components/MyNotifications/MyNotificationBody";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";

const MyNotificationsPage = () => {
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  return (
    <div className="h-screen overflow-auto p-30pxr">
      <MyNotificationTitle />
      <MyNotificationBody />
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

export default MyNotificationsPage;
