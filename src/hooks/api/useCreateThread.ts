import { usePostThread } from "@/apis/thread/usePostThread";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";

interface Props {
  nickname: string | undefined;
  channelId: string;
}
const useCreateThread = ({ nickname, channelId }: Props) => {
  const { mutate: createThreadMutate } = usePostThread(channelId);

  const uploadThread = (formValues: FormValues) => {
    if (!formValues) return;

    const { anonymous, content } = formValues;
    const threadRequest = {
      title: JSON.stringify({
        content,
        nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
      }),
      image: null,
      channelId,
    };

    createThreadMutate(threadRequest);
  };
  return { uploadThread };
};

export default useCreateThread;
