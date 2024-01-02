import api from "@/apis/core";

import { Thread } from "@/types/thread";

export const getThreadsByChannelId = (channelId: string) =>
  api.get<Thread[]>({ url: `/posts/channel/${channelId}` });
