import { usePostThread } from "@/apis/thread/usePostThread";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";

interface Props {
  nickname: string | undefined;
  channelId: string;
}
const useCreateThread = ({ nickname, channelId }: Props) => {
  const { mutate: createThreadMutate } = usePostThread(channelId);

  const uploadThread = (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname }),
      image: null,
      channelId,
    };

    createThreadMutate(threadRequest);
  };
  return { uploadThread };
};

export default useCreateThread;
