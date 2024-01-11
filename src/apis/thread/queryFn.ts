import api from "@/apis/core";

import { parseFullName, parseTitleOrComment } from "@/utils/parsingJson";

import { Like, Thread } from "@/types/thread";

interface DefaultThreadRequest {
  title: string; // JSON.stringify(CustomBody)
  image: null;
}

interface CreateThread extends DefaultThreadRequest {
  channelId: string;
}

interface PatchThread extends DefaultThreadRequest {
  postId: string;
}

export const createThread = async (postInfo: CreateThread) => {
  return await api.post<Thread>({ url: `/posts/create`, data: postInfo });
};

export const patchThread = async (postInfo: PatchThread) => {
  return await api.put<Thread>({ url: `/posts/update`, data: postInfo });
};

export const getThreadsByChannelId = async (channelId: string) => {
  const threads = await api.get<Thread[]>({ url: `/posts/channel/${channelId}` });

  return threads.map((thread) => {
    const { name } = parseFullName(thread.author.fullName);
    const { content, nickname, mentionedList } = parseTitleOrComment(thread.title);

    return {
      ...thread,
      content,
      mentionedList,
      author: {
        ...thread.author,
        name,
        nickname,
      },
    };
  });
};

export const postThreadLike = (threadId: string) =>
  api.post<Like>({ url: "/likes/create", data: { postId: threadId } });

export const deleteThreadLike = (postId: string) =>
  api.delete<Like>({ url: "/likes/delete", data: { id: postId } });

export const getThreadByThreadId = async (threadId: string) => {
  const thread = await api.get<Thread>({ url: `/posts/${threadId}` });
  const { content, nickname, mentionedList } = parseTitleOrComment(thread.title);

  return {
    ...thread,
    content,
    nickname,
    mentionedList,
    author: {
      ...thread.author,
      nickname,
    },
  };
};

export const deleteThread = (threadId: string) => {
  return api.delete<Thread>({ url: `/posts/delete`, data: { id: threadId } });
};
