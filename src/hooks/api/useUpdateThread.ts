import { useMutation, useQueryClient } from "@tanstack/react-query";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import { putThread } from "@/apis/thread/queryFn";

const useUpdateThread = (channelId: string, postId: string) => {
  const { mutateAsync: patchThreadMutate } = useMutation({ mutationFn: putThread });
  const queryClient = useQueryClient();

  const updateThread = async (payload: ThreadCommonPayload) => {
    await patchThreadMutate({ channelId, postId, payload });

    queryClient.invalidateQueries({
      queryKey: ["thread", postId],
    });
  };

  return updateThread;
};

export default useUpdateThread;
