import { useMutation } from "@tanstack/react-query";

import { patchThread } from "@/apis/thread";

export const usePutThread = () => {
  return useMutation({ mutationFn: patchThread, onError: () => {} });
};
