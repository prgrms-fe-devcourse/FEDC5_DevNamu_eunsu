import api from "@/apis/core";

import { Thread } from "@/types/thread";
import { UserForComments } from "@/types/user";

export const getMyThreads = (authorId: string) =>
  api.get<Thread[]>({ url: `/posts/author/${authorId}` });

export const getUser = (authorId: string) =>
  api.get<UserForComments>({ url: `/users/${authorId}` });
