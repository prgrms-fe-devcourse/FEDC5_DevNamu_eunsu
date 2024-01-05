import { usePutThread } from "@/apis/thread/usePutThread.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";

interface Props {
  nickname: string | undefined;
  postId: string;
}
const useChangeThread = ({ nickname, postId }: Props) => {
  const { mutate: patchThreadMutate } = usePutThread();

  const changeThread = (formValues: FormValues) => {
    if (!formValues) return;

    const { anonymous, content } = formValues;
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      postId,
    };

    patchThreadMutate(threadRequest);
  };
  return { changeThread };
};

export default useChangeThread;
