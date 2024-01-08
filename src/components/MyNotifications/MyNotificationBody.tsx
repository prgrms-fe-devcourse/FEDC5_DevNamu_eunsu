import MyNotificationItem from "./MyNotificationItem";

import useGetNotification from "@/apis/mynotification/useGetNotification";
import useGetMentioned from "@/apis/mynotification/useGetMentioned";

const MyNotificationBody = () => {
  const { myNotifications, isPending: notificationPending } = useGetNotification();
  const { myMentions, isPending: mentionPending } = useGetMentioned();

  if (notificationPending || mentionPending) {
    return <span>Loading...</span>;
  }

  console.log(notificationPending);
  console.log(myMentions);

  const 합쳐진데이터 = [...myNotifications, ...myMentions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  console.log("합쳐진 데이터", 합쳐진데이터);

  return (
    <main className="p-10pxr">
      <ul className="list-none">
        {합쳐진데이터?.map(({ _id, comment, message, post, createdAt }) => {
          return (
            <MyNotificationItem
              key={typeof _id === "string" ? _id : _id[0]}
              postId={post}
              comment={comment?.comment}
              message={message}
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
