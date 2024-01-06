import { useQueryClient } from "@tanstack/react-query";

import { usePutThread } from "@/apis/thread/usePutThread.ts";
import { ThreadCommonPayload } from "@/components/common/Editor/form";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

const useUpdateThread = (channelId: string, postId: string) => {
  const { mutateAsync: patchThreadMutate } = usePutThread();
  const queryClient = useQueryClient();

  const changeThread = async ({ anonymous, content, nickname }: ThreadCommonPayload) => {
    const requestBody = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      postId,
      channelId,
    };

    await patchThreadMutate(requestBody);

    queryClient.invalidateQueries({
      queryKey: ["thread", postId],
    });
  };

  return changeThread;
};

export default useUpdateThread;
