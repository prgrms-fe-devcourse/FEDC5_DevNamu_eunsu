import api from "@/apis/core";

import { parseFullName, parseTitle } from "@/utils/parsingJson";

import { Like, Thread } from "@/types/thread";

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
    const { name } = parseFullName(thread.author.fullName);
    const { content, nickname } = parseTitle(thread.title);

    return {
      ...thread,
      content,
      author: {
        ...thread.author,
        name,
        nickname,
      },
    };
  });
};

export const postThreadLike = (postId: string) =>
  api.post({ url: "/likes/create", data: { postId } });

export const deleteThreadLike = (postId: string) =>
  api.delete<Like>({ url: "/likes/delete", data: { id: postId } });
