import { usePostThread } from "@/apis/thread/usePostThread";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { formJSONStringify } from "@/lib/editorContent.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useMentionNotification from "@/hooks/api/useMentionNotification.ts";

interface Props {
  nickname: string | undefined;
  channelId: string;
}

export interface FormSubmitProps {
  formValues: FormValues;
  mentionedList?: UserDBProps[];
}

const useCreateThread = ({ nickname, channelId }: Props) => {
  const { mutateAsync: createThreadMutate } = usePostThread(channelId);
  const { mentionNotification } = useMentionNotification();
  // const { sendMessageBySlackBot } = usePostSlackMessage();
  const uploadThread = async ({ formValues, mentionedList }: FormSubmitProps) => {
    if (!formValues) return;

    const threadRequest = {
      title: formJSONStringify({ formValues, nickname, mentionedList }),
      image: null,
      channelId,
    };

    const threadResponse = await createThreadMutate(threadRequest);

    if (!mentionedList) return;

    mentionNotification({
      mentionedList,
      content: formValues.content,
      postId: threadResponse._id,
      channelName: threadResponse.channel.name,
    });

    // sendMessageBySlackBot({ mentionedList });
  };
  return { uploadThread };
};

export default useCreateThread;
