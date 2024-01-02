import { useMutation } from "@tanstack/react-query";

import { createThread, patchThread } from "@/apis/thread/queryFn.ts";

// todo [24/1/2] : error handling 공통으로 뺼 것
export const useCreateThreadMutate = () => {
  return useMutation({ mutationFn: createThread, onError: () => {} });
};

export const usePatchThreadMutate = () => {
  return useMutation({ mutationFn: patchThread, onError: () => {} });
};
