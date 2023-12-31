import { useMutation } from "@tanstack/react-query";

import { createPost, patchPost } from "@/apis/post/queryFn.ts";

export const useCreatePostMutate = () => {
  return useMutation({ mutationFn: createPost, onError: () => {} });
};

export const usePatchPostMutate = () => {
  return useMutation({ mutationFn: patchPost });
};
