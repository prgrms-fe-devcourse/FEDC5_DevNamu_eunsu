import api from "@/apis/core";

import { Comment } from "@/types/thread.ts";

interface CreateComment {
  comment: {
    content: string;
    userName: string | undefined;
  };
  postId: string;
}

export const createComment = async (data: CreateComment) => {
  return await api.post<Comment>({ url: "/notifications/create", data });
};
