import { usePostThread } from "@/apis/thread/usePostThread";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";

interface Props {
  nickname: string | undefined;
  channelId: string;
  mentionList?: UserDBProps[];
}
const useCreateThread = ({ nickname, channelId, mentionList }: Props) => {
  const { mutateAsync: createThreadMutate } = usePostThread(channelId);
  const { mentionNotification } = useMentionNotification({ mentionList });

  const uploadThread = async (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname }),
      image: null,
      channelId,
    };

    const threadResponse = await createThreadMutate(threadRequest);

    mentionList &&
      mentionNotification({
        content: formValues.content,
        postId: threadResponse._id,
        channelName: threadResponse.channel.name,
      });
  };
  return { uploadThread };
};

export default useCreateThread;
