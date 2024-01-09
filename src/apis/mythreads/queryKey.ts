import { createQueryKeys } from "@lukemorales/query-key-factory";

import { User } from "@/types/user";

import { getMyThreads, getUser } from "./queryFn";

const myPosts = createQueryKeys("myPosts", {
  myThreads: (authorId: string) => ({
    queryKey: ["myPosts", authorId],
    queryFn: () => getMyThreads(authorId),
  }),
  myComments: (authorId: string) => ({
    queryKey: ["myComments", authorId],
    queryFn: () => getUser(authorId),
    select: (user: User) => {
      const { comments } = user;
      return comments;
    },
  }),
});

export default myPosts;
