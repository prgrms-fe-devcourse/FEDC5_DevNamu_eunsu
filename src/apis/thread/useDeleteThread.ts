import { useMutation } from "@tanstack/react-query";

import { deleteThread } from "@/apis/thread/queryFn.ts";

const useDeleteThread = () => {
  return useMutation({ mutationFn: deleteThread, onError: () => {} });
};

export default useDeleteThread;
