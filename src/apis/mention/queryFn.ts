import api from "@/apis/core";

import { Message } from "@/types/notification.ts";

interface CreateMention {
  message: string; // JSON.stringify(CustomBody)
  receiver: string; // 멘션된 userId
}
export const createMention = async (mentionInfo: CreateMention) => {
  return await api.post<Message>({ url: `/messages/create`, data: mentionInfo });
};
