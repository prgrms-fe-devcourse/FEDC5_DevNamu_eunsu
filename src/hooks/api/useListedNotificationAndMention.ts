import useGetNotification from "@/apis/mynotification/useGetNotification";
import useGetMentioned from "@/apis/mynotification/useGetMentioned";

const useListedNotificationAndMention = () => {
  const { myNotifications, isPending: notificationPending } = useGetNotification();
  const { myMentions, isPending: mentionPending } = useGetMentioned();
  const listedNotificationAndMention = [];

  if (myNotifications) listedNotificationAndMention.push(...myNotifications);

  if (myMentions) listedNotificationAndMention.push(...myMentions);

  listedNotificationAndMention.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    listedNotificationAndMention,
    isPending: notificationPending || mentionPending,
  };
};

export default useListedNotificationAndMention;
