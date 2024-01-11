import useNotificationStore from "@/stores/notificaitons";

import useGetNotification from "@/apis/mynotification/useGetNotification";
import useGetMentioned from "@/apis/mynotification/useGetMentioned";

const useListedNotificationAndMention = () => {
  const { hasNewNotification, checkNotification } = useNotificationStore();

  const { myNotifications, isPending: notificationPending } = useGetNotification();
  const { myMentions, isPending: mentionPending } = useGetMentioned();
  const listedNotificationAndMention = [];

  if (myNotifications) listedNotificationAndMention.push(...myNotifications);

  if (myMentions) listedNotificationAndMention.push(...myMentions);

  listedNotificationAndMention.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  console.log(listedNotificationAndMention);
  const checkNew = listedNotificationAndMention.some((item) => !item.seen);
  console.log(checkNew);
  if (checkNew) {
    checkNotification(true);
    console.log("새 알림이 있나요~", hasNewNotification);
  } else {
    console.log("새 알림이 없나요~", hasNewNotification);
  }
  return {
    listedNotificationAndMention,
    isPending: notificationPending || mentionPending,
  };
};

export default useListedNotificationAndMention;
