import { useState } from "react";

import { User } from "@/types/user";

import EditorForm, { EditorFormValues } from "./form";

import MentionInput from "@/components/common/Mention/MentionInput.tsx";
import { RegisteredUser } from "@/constants/dummyData.ts";

interface Props {
  disableMention?: boolean;
  user?: User | null;
  placeholderText?: string;
  onSubmit: (formValues: EditorFormValues) => Promise<unknown>;
}

const EditorTextArea = ({ disableMention, placeholderText, onSubmit }: Props) => {
  const [mentionedPeople, setMentionedList] = useState<Array<RegisteredUser>>([]);
  const removeAllMentionedPeople = () => setMentionedList([]);

  const handleSubmit = async (values: EditorFormValues) => {
    try {
      await onSubmit(values);
    } catch (e) {
      // react-query mutate error
      // TODO: 예외 상황을 유저에게 알리기
      console.error(e);
      return;
    }
    removeAllMentionedPeople();
  };

  return (
    <div className="relative flex flex-col w-full gap-1">
      {!disableMention && <MentionInput chosenList={mentionedPeople} onChoose={setMentionedList} />}
      <EditorForm onSubmit={handleSubmit} placeholderText={placeholderText} />
    </div>
  );
};

export default EditorTextArea;
