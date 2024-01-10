import { Conversation, Notification } from "@/types/notification";

import LikeNotification from "./LikeNotification";

import useListedNotificationAndMention from "@/hooks/api/useListedNotificationAndMention.ts";
import CommentNotification from "@/components/MyNotifications/CommentNotification.tsx";
import MentionNotification from "@/components/MyNotifications/MentionNotification.tsx";

const isComment = (props: Notification | Conversation): props is Notification => {
  return "comment" in props;
};

const isLike = (props: Notification | Conversation): props is Notification => {
  return "like" in props && props.like !== null;
};

const isMention = (props: Notification | Conversation): props is Notification => {
  if (!("message" in props)) return false;

  try {
    JSON.parse((props as Conversation).message);
    return true;
  } catch (e) {
    return false;
  }
};

const MyNotificationBody = () => {
  const { listedNotificationAndMention, isPending } = useListedNotificationAndMention();
  console.log("listedNotificationAndMention", listedNotificationAndMention);
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
            console.log("likenoti", notification);
            const { like } = notification;
            return (
              <LikeNotification
                key={typeof _id === "string" ? _id : _id[0]}
                createdAt={createdAt}
                like={like}
              />
            );
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
        })}
      </ul>
    </main>
  );
};

export default MyNotificationBody;
