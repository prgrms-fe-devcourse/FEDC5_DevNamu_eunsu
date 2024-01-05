import { useMutation } from "@tanstack/react-query";

import { putThread } from "@/apis/thread/queryFn.ts";

export const usePutThread = () => {
  return useMutation({ mutationFn: putThread, onError: () => {} });
};
