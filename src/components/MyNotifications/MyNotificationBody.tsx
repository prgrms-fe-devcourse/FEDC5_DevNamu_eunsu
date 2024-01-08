import { Conversation, Notification } from "@/types/notification";

import useListedNotificationAndMention from "@/hooks/api/useListedNotificationAndMention.ts";
import CommentNotification from "@/components/MyNotifications/CommentNotification.tsx";
import MentionNotification from "@/components/MyNotifications/MentionNotification.tsx";

const isComment = (props: Notification | Conversation): props is Notification => {
  return "comment" in props;
};

const MyNotificationBody = () => {
  const { listedNotificationAndMention, isPending } = useListedNotificationAndMention();

  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <main className="p-10pxr">
      <ul className="list-none">
        {/*TODO : [24/1/8] 더 깔끔하게 작성할 것*/}
        {listedNotificationAndMention?.map((notification) => {
          const { _id, message, createdAt } = notification;

          if (isComment(notification)) {
            const { comment, post, createdAt } = notification;
            return (
              <CommentNotification
                key={typeof _id === "string" ? _id : _id[0]}
                postId={post || ""}
                comment={comment?.comment || ""}
                createdAt={createdAt}
              />
            );
          }

          return (
            <MentionNotification
              key={typeof _id === "string" ? _id : _id[0]}
              message={message || ""}
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
