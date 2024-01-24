import usePutThread from "@/apis/thread/usePutThread.ts";
import { formJSONStringify } from "@/lib/editorContent.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";

interface Props {
  nickname: string | undefined;
  postId: string;
  channelId: string;
}
const useChangeThread = ({ nickname, postId, channelId }: Props) => {
  const { mutateAsync: patchThreadMutate } = usePutThread();
  const { mentionNotification } = useMentionNotification();
  const { sendMessageBySlackBot } = usePostSlackMessage();

  const changeThread = async ({ formValues, mentionedList }: FormSubmitProps) => {
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
