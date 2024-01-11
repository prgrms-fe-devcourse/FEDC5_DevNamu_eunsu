import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import { FormValues } from "@/components/common/EditorTextArea.tsx";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface FormProps {
  formValues: FormValues;
  nickname: string | undefined;
  mentionedList?: UserDBProps[];
}

export const formJSONStringify = ({ formValues, nickname, mentionedList }: FormProps) => {
  const { anonymous, content } = formValues;

  return JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
    mentionedList: mentionedList?.map(({ name }) => `@${name}`).join(", "),
  });
};
