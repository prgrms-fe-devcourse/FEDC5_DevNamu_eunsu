import api from "@/apis/core";

interface Thread {
  title: string; // JSON.stringify(CustomBody)
  image: null;
}

interface CreateThread extends Thread {
  channelId: string;
}

interface PatchThread extends Thread {
  postId: string;
}

export const createThread = async (postInfo: CreateThread) => {
  return await api.post<Thread>({ url: `/posts/create`, data: postInfo });
};

export const putThread = async (postInfo: PatchThread) => {
  return await api.put<Thread>({ url: `/posts/update`, data: postInfo });
};

export const patchThread = async (postInfo: PatchThread) => {
  return await api.patch<Thread>({ url: `/posts/patch`, data: postInfo });
};

export const getThreadsByChannelId = (channelId: string) =>
  api.get<Thread[]>({ url: `/posts/channel/${channelId}` });
