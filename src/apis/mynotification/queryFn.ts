import api from "@/apis/core";

import { Notification, Conversation } from "@/types/notification";

export const getMyNotification = () => api.get<Notification[]>({ url: `/notifications` });

export const getMyMentioned = () => api.get<Conversation[]>({ url: `/messages/conversations` });

export const putMyNotificationSeen = () => api.put({ url: `/notifications/seen` });

export const putMyMentionedSeen = (userId: string) =>
  api.put({ url: `/messages/update-seen`, data: { sender: userId } });
