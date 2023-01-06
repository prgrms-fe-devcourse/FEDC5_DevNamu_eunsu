import api from "@/apis/core";

import { parseFullName } from "@/utils/parsingJson";

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

export const getThreadsByChannelId = async (channelId: string) => {
  const threads = await api.get<Thread[]>({ url: `/posts/channel/${channelId}` });

  return threads.map((thread) => {
    const { nickname, name } = parseFullName(thread.author.fullName);

    return {
      ...thread,
      author: {
        ...thread.author,
        name,
        nickname,
      },
    };
  });
};
