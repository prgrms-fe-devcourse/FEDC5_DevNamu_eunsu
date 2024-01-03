import api from "@/apis/core";

import { Thread } from "@/types/thread";

export const getMyThreads = (authorId: string) =>
  api.get<Thread[]>({ url: `/posts/author/${authorId}` });
