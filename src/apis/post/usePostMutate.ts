import { useMutation } from "@tanstack/react-query";

import { createPost, patchPost } from "@/apis/post/queryFn.ts";

// todo [24/1/2] : error handling 공통으로 뺼 것
export const useCreatePostMutate = () => {
  return useMutation({ mutationFn: createPost, onError: () => {} });
};

export const usePatchPostMutate = () => {
  return useMutation({ mutationFn: patchPost, onError: () => {} });
};
