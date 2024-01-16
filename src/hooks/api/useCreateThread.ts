import { usePostThread } from "@/apis/thread/usePostThread";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";
import usePostSlackMessage from "@/apis/slackBot/usePostSlackMessage.ts";

interface Props {
  nickname: string | undefined;
  channelId: string;
  mentionedList?: UserDBProps[];
}
const useCreateThread = ({ nickname, channelId, mentionedList }: Props) => {
  const { mutateAsync: createThreadMutate } = usePostThread(channelId);
  const { mentionNotification } = useMentionNotification({ mentionedList });
  const { sendMessageBySlackBot } = usePostSlackMessage();
  const uploadThread = async (formValues: FormValues) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname, mentionedList }),
      image: null,
      channelId,
    };

    const threadResponse = await createThreadMutate(threadRequest);

    if (!mentionedList) return;

    mentionNotification({
      content: formValues.content,
      postId: threadResponse._id,
      channelName: threadResponse.channel.name,
    });

    sendMessageBySlackBot({ mentionedList });
  };
  return { uploadThread };
};

export default useCreateThread;
