import { useQuery } from "@tanstack/react-query";

import myPosts from "./queryKey";

const useGetMyComments = (authorId: string) => {
  const { data, isPending } = useQuery(myPosts.myComments(authorId));

  return {
    myComments: data?.comments,
    isCommentPending: isPending,
  };
};

export default useGetMyComments;
