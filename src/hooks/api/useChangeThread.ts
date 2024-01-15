import usePutThread from "@/apis/thread/usePutThread.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  channelId: string;
  mentionedList?: UserDBProps[];
}
const useChangeThread = ({ nickname, postId, channelId, mentionedList }: Props) => {
  const { mutateAsync: patchThreadMutate } = usePutThread();
  const { mentionNotification } = useMentionNotification({ mentionedList });
  const { sendMessageBySlackBot } = usePostSlackMessage();

  const changeThread = async (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname, mentionedList }),
      image: null,
      postId,
      channelId,
    };

    const ThreadResponse = await patchThreadMutate(threadRequest);

    if (!mentionedList) return;

    mentionNotification({
      content: formValues.content,
      postId: ThreadResponse._id,
      channelName: ThreadResponse.channel.name,
    });

    sendMessageBySlackBot({ mentionedList });
  };
  return { changeThread };
};

export default useChangeThread;
