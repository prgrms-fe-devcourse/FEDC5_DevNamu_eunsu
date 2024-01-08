import api from "@/apis/core";

import { Thread } from "@/types/thread";

interface CreateThread {
  title: string; // JSON.stringify(CustomBody)
  image: null;
  channelId: string;
}

interface PatchThread extends CreateThread {
  postId: string;
}

export const createThread = async (postInfo: CreateThread) => {
  return await api.post<Thread>({ url: `/posts/create`, data: postInfo });
};

export const patchThread = async (postInfo: PatchThread) => {
  return await api.patch<Thread>({ url: `/posts/patch`, data: postInfo });
};

export const getThreadsByChannelId = (channelId: string) =>
  api.get<Thread[]>({ url: `/posts/channel/${channelId}` });

export const postThreadLike = (postId: string) =>
  api.post({ url: "/likes/create", data: { postId } });
