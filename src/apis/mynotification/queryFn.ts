import api from "@/apis/core";

import { Notification, Conversation } from "@/types/notification";

export const getMyNotification = () => api.get<Notification[]>({ url: `/notifications` });

export const getMyMentioned = () => api.get<Conversation[]>({ url: `/messages/conversations` });
