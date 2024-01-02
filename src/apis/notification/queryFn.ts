import api from "@/apis/core.ts";

export type NotificationTypes = "COMMENT" | "FOLLOW" | "LIKE" | "MESSAGE";
export interface CreateNotification {
  notificationType: NotificationTypes;
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export const createNotification = async (notificationInfo: CreateNotification) => {
  return await api.post<Notification>({ url: `/notifications/create`, data: notificationInfo });
};
