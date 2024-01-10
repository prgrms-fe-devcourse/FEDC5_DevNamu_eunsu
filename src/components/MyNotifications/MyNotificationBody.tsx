import { Conversation, Notification } from "@/types/notification";

import useListedNotificationAndMention from "@/hooks/api/useListedNotificationAndMention.ts";
import CommentNotification from "@/components/MyNotifications/CommentNotification.tsx";
import MentionNotification from "@/components/MyNotifications/MentionNotification.tsx";

const isComment = (props: Notification | Conversation): props is Notification => {
  return "comment" in props;
};

const isLike = (props: Notification | Conversation): props is Notification => {
  return "like" in props;
};

const isMention = (props: Notification | Conversation): props is Notification => {
  return "message" in props;
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
              /*TODO : [24/1/9] id처리 커스텀훅으로 로직 분리하기*/
              <CommentNotification
                key={typeof _id === "string" ? _id : _id[0]}
                postId={post || ""}
                comment={comment?.comment || ""}
                createdAt={createdAt}
              />
            );
          }
          if (isLike(notification)) {
            return <div>아직 안 만들었어요~!</div>;
          }

          if (isMention(notification)) {
            return (
              <MentionNotification
                key={typeof _id === "string" ? _id : _id[0]}
                message={message || ""}
                createdAt={createdAt}
              />
            );
          }

          return <div key={typeof _id === "string" ? _id : _id[0]}>알림이 없습니다.</div>;
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
