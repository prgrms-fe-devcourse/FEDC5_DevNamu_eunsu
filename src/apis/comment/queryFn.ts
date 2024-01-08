import api from "@/apis/core";

import { Comment } from "@/types/thread.ts";

interface CreateComment {
  comment: string; // JSON.stringify(CustomBody)
  postId: string;
}

export const createComment = async (commentInfo: CreateComment) => {
  return await api.post<Comment>({ url: `/comments/create`, data: commentInfo });
};

export const deleteComment = (commentId: string) => {
  return api.delete<Comment>({ url: `/comments/delete`, data: { id: commentId } });
};
