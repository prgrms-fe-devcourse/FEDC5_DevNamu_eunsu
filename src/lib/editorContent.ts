import { EditorFormValues } from "@/components/common/Editor/EditorForm";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";

interface Props {
  formValues: EditorFormValues;
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
