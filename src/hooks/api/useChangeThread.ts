import { usePutThread } from "@/apis/thread/usePutThread.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  mentionList?: UserDBProps[];
}
const useChangeThread = ({ nickname, postId, mentionList }: Props) => {
  const { mutateAsync: patchThreadMutate } = usePutThread();
  const { mentionNotification } = useMentionNotification({ mentionList });
  const changeThread = async (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname }),
      image: null,
      postId,
    };

    const ThreadResponse = await patchThreadMutate(threadRequest);

    if (!mentionList) return;

    mentionNotification({
      content: formValues.content,
      postId: ThreadResponse._id,
      channelName: ThreadResponse.channel.name,
    });
  };
  return { changeThread };
};

export default useChangeThread;
