import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";

interface FormProps {
  formValues: FormValues;
  nickname: string | undefined;
}

export const formJSONStringify = ({ formValues, nickname }: FormProps) => {
  const { anonymous, content } = formValues;

  return JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
  });
};

interface MentionProps {
  channelId: string;
  postId: string;
  content: string;
}
export const mentionJSONStringify = ({ channelId, postId, content }: MentionProps) => {
  return JSON.stringify({
    channelId,
    postId,
    content,
  });
};
