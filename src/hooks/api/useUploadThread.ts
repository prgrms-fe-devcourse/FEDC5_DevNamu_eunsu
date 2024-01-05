import { usePostThread } from "@/apis/thread/usePostThread";
import { usePutThread } from "@/apis/thread/usePutThread";
import { SubmitType } from "@/components/common/EditorTextArea.tsx";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";

interface Props {
  submitType: SubmitType;
  nickname: string | undefined;
  channelId: string;
  postId?: string;
}

const useUploadThread = ({ submitType, nickname, channelId, postId }: Props) => {
  const { mutate: createThreadMutate } = usePostThread(channelId);
  const { mutate: patchThreadMutate } = usePutThread();

  const uploadThread = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      channelId,
    };

    if (submitType === "create") {
      createThreadMutate(threadRequest);
    } else {
      // TODO: [24/1/2] create, patch 분기 처리 리펙토링 할 것
      if (!postId) {
        console.error("postId 가 필요합니다.");
        return;
      }
      const patchReq = {
        postId,
        ...threadRequest,
      };
      patchThreadMutate(patchReq);
    }
  };
  return { uploadThread };
};

export default useUploadThread;
