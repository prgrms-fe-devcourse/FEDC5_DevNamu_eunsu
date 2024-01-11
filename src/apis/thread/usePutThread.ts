import { useMutation } from "@tanstack/react-query";

import { patchThread } from "@/apis/thread/queryFn.ts";

const usePutThread = () => {
  return useMutation({
    mutationFn: patchThread,
    onError: () => {},
  });
};

export default usePutThread;
