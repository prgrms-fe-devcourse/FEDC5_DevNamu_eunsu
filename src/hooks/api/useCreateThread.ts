import { usePostThread } from "@/apis/thread/usePostThread";
import { EditorFormValues } from "@/components/common/Editor/EditorForm";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname";

interface Props {
  channelId: string;
}

const useCreateThread = ({ channelId }: Props) => {
  const { mutate: createThreadMutate } = usePostThread(channelId);

  const uploadThread = (formValues: EditorFormValues) => {
    if (!formValues) return;

    const { anonymous, content, nickname } = formValues;

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
