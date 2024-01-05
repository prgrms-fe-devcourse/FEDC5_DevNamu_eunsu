import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";

interface Props {
  formValues: FormValues;
  nickname: string | undefined;
}

const formJsonStringify = ({ formValues, nickname }: Props) => {
  const { anonymous, content } = formValues;

  return JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
  });
};

export default formJsonStringify;
