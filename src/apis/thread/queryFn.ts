import api from "@/apis/core";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";
import { Thread } from "@/types/thread";

import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

interface PostThreadRequest {
  channelId: string;
  payload: ThreadCommonPayload;
}

interface PutThreadRequest extends PostThreadRequest {
  postId: string;
}

export const serializeCustomThreadBody = ({ content, anonymous, nickname }: ThreadCommonPayload) =>
  JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
  });

export const postThread = async ({ channelId, payload }: PostThreadRequest) =>
  api.post<Thread>({
    url: "/posts/create",
    data: {
      title: serializeCustomThreadBody(payload),
      image: null,
      channelId,
    },
  });

export const putThread = async ({ postId, channelId, payload }: PutThreadRequest) =>
  api.put<Thread>({
    url: "/posts/update",
    data: {
      title: serializeCustomThreadBody(payload),
      image: null,
      channelId,
      postId,
    },
  });

export const getThreadsByChannelId = (channelId: string) =>
  api.get<Thread[]>({ url: `/posts/channel/${channelId}` });
