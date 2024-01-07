import { useMutation } from "@tanstack/react-query";

import { createComment } from "@/apis/comment";

export const usePostComment = () => {
  // TODO: [24/1/2] error handling 공통으로 뺼 것
  return useMutation({ mutationFn: createComment, onError: () => {} });
};
