import { useQueryClient } from "@tanstack/react-query";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import threads from "@/apis/thread/queryKey";
import { usePostThread } from "@/apis/thread/usePostThread";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

interface Props {
  channelId: string;
}

const useCreateThread = ({ channelId }: Props) => {
  const { mutateAsync: createThreadMutate } = usePostThread(channelId);
  const queryClient = useQueryClient();

  const uploadThread = async ({ anonymous, content, nickname }: ThreadCommonPayload) => {
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      channelId,
    };

    await createThreadMutate(threadRequest);

    queryClient.invalidateQueries({
      queryKey: threads.threadsByChannel(channelId).queryKey,
    });
  };

  return uploadThread;
};

export default useCreateThread;
