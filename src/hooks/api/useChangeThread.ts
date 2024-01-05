import { usePutThread } from "@/apis/thread/usePutThread.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import formJsonStringify from "@/lib/editorContent.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
}
const useChangeThread = ({ nickname, postId }: Props) => {
  const { mutate: patchThreadMutate } = usePutThread();

  const changeThread = (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJsonStringify({ formValues, nickname }),
      image: null,
      postId,
    };

    patchThreadMutate(threadRequest);
  };
  return { changeThread };
};

export default useChangeThread;
