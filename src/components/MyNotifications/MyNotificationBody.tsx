import MyNotificationItem from "./MyNotificationItem";

import useGetmyNotification from "@/apis/mynotification/useGetMyNotification";

const MyNotificationBody = () => {
  const { myNotifications, isPending } = useGetmyNotification();

  if (isPending || !myNotifications) {
    return <span>Loading...</span>;
  }

  return (
    <main className="p-10pxr">
      <ul className="list-none">
        {myNotifications.map(({ _id, seen, comment, createdAt }) => {
          return (
            <MyNotificationItem
              key={_id}
              seen={seen}
              comment={comment?.comment}
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
