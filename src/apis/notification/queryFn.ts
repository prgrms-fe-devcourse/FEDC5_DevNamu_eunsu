import api from "@/apis/core.ts";

export interface CreateNotification {
  notificationType: "COMMENT" | "FOLLOW" | "LIKE" | "MESSAGE";
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export const createNotification = async (data: CreateNotification) => {
  return await api.post<Notification>({ url: `/posts/create`, data });
};
