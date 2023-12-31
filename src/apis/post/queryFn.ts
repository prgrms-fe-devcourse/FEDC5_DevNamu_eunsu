import api from "@/apis/core";

import { Thread } from "@/types/thread.ts";

interface CustomBody {
  content: string;
  userName: string | undefined;
}

interface CreatePost {
  title: CustomBody;
  image: null;
  channelId: string;
}

interface PatchPost extends CreatePost {
  postId: string;
}

export const createPost = async (data: CreatePost) => {
  return await api.post<Thread>({ url: `/posts/create`, data });
};

export const patchPost = async (data: PatchPost) => {
  return await api.patch<Thread>({ url: `/posts/patch`, data });
};
