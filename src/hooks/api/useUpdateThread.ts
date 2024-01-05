import { usePutThread } from "@/apis/thread/usePutThread.ts";
import { EditorFormValues } from "@/components/common/Editor/EditorForm";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

const useUpdateThread = (channelId: string, postId: string) => {
  const { mutate: patchThreadMutate } = usePutThread();

  const changeThread = (formValues: EditorFormValues) => {
    if (!formValues) return;

    const { anonymous, content, nickname } = formValues;
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      postId,
      channelId,
    };

    patchThreadMutate(threadRequest);
  };
  return { changeThread };
};

export default useUpdateThread;
