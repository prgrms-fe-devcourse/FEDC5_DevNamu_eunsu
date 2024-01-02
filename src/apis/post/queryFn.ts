import api from "@/apis/core";

import { Thread } from "@/types/thread.ts";

// interface CustomBody {
//   content: string;
//   nickName: string | undefined;
// }

interface CreatePost {
  title: string; // JSON.stringify(CustomBody)
  image: null;
  channelId: string;
}

interface PatchPost extends CreatePost {
  postId: string;
}

export const createPost = async (postInfo: CreatePost) => {
  return await api.post<Thread>({ url: `/posts/create`, data: postInfo });
};

export const patchPost = async (postInfo: PatchPost) => {
  return await api.patch<Thread>({ url: `/posts/patch`, data: postInfo });
};
