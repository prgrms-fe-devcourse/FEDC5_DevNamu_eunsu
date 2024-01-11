import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import useSelectedThreadStore from "@/stores/thread";

import MyNotificationTitle from "@/components/MyNotifications/MyNotificationTitle";
import MyNotificationBody from "@/components/MyNotifications/MyNotificationBody";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";
import { putMyMentionedSeen, putMyNotificationSeen } from "@/apis/mynotification/queryFn.ts";
import useGetUserInfo from "@/apis/auth/useGetUserInfo";

const MyNotificationsPage = () => {
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  const userInfo = useGetUserInfo();
  if (userInfo.user !== undefined && userInfo.user !== null) {
    putMyMentionedSeen(userInfo.user._id);
    putMyNotificationSeen();
  }

  useEffect(() => {
    Sentry.captureMessage("visit - MyNotificationsPage");
  }, []);

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
