import { SubmitType } from "@/components/common/EditorTextArea.tsx";
import { useCreateThreadMutate, usePatchThreadMutate } from "@/apis/thread/useThreadMutate.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickName.ts";

interface Props {
  submitType: SubmitType;
  nickName: string | undefined;
  channelId: string;
  postId?: string;
}

const useUploadThread = ({ submitType, nickName, channelId, postId }: Props) => {
  const { mutate: createThreadMutate } = useCreateThreadMutate();
  const { mutate: patchThreadMutate } = usePatchThreadMutate();

  const uploadThread = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickName: anonymous ? ANONYMOUS_NICKNAME : nickName,
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
