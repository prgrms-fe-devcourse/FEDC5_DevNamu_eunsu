import api from "@/apis/core";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";
import { Comment } from "@/types/thread.ts";

import { serializeCustomThreadBody } from "../thread/queryFn";

interface CreateCommentRequest {
  payload: ThreadCommonPayload;
  postId: string;
}

export const postComment = async ({ payload, postId }: CreateCommentRequest) => {
  return await api.post<Comment>({
    url: `/comments/create`,
    data: {
      comment: serializeCustomThreadBody(payload),
      postId,
    },
  });
};
