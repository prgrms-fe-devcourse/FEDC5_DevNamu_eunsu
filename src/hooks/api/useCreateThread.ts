import { useMutation, useQueryClient } from "@tanstack/react-query";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import threads from "@/apis/thread/queryKey";
import { postThread } from "@/apis/thread/queryFn";

// 기존에 있던 src/apis/thread/usePostThread와 중복이네요??
// 이 훅은 재훈님 플랜대로면 재훈님 작업 영역이니 기존 걸 대체하는 게 맞겠네요
const useCreateThread = (channelId: string) => {
  const { mutateAsync: createThreadMutate } = useMutation({
    mutationFn: postThread,
  });

  const queryClient = useQueryClient();

  const createThread = async (payload: ThreadCommonPayload) => {
    await createThreadMutate({ channelId, payload });

    queryClient.invalidateQueries({
      queryKey: threads.threadsByChannel(channelId).queryKey,
    });
  };

  return createThread;
};

export default useCreateThread;
