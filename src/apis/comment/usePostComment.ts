import { useMutation } from "@tanstack/react-query";

import { postComment } from "@/apis/comment/queryFn.ts";

export const usePostComment = () => {
  // TODO: [24/1/2] error handling 공통으로 뺼 것
  return useMutation({ mutationFn: postComment, onError: () => {} });
};
