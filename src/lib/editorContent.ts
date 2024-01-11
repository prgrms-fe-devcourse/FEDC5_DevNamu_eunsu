import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface FormProps {
  formValues: FormValues;
  nickname: string | undefined;
  mentionList?: UserDBProps[];
}

export const formJSONStringify = ({ formValues, nickname, mentionList }: FormProps) => {
  const { anonymous, content } = formValues;

  return JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
    mentionList: mentionList?.map(({ name }) => `@${name}`).join(", "),
  });
};
