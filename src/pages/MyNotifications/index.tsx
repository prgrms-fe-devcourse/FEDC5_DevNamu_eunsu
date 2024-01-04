import MyNotificationTitle from "@/components/MyNotifications/MyNotificationTitle";
import MyNotificationBody from "@/components/MyNotifications/MyNotificationBody";

const MyNotificationsPage = () => {
  return (
    <div className="h-screen overflow-auto p-30pxr">
      <MyNotificationTitle />
      <MyNotificationBody />
    </div>
  );
};

export default MyNotificationsPage;
