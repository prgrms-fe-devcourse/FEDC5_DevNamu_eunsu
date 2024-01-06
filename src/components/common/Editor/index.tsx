import { useState } from "react";

import { User } from "@/types/user";

import EditorForm, { ThreadCommonPayload } from "./form";

import MentionInput from "@/components/common/Mention/MentionInput.tsx";
import { RegisteredUser } from "@/constants/dummyData.ts";

interface Props {
  disableMention?: boolean;
  initialText?: string;
  user?: User | null;
  placeholderText?: string;
  onSubmit: (payload: ThreadCommonPayload) => Promise<unknown>;
}

const CommonThreadEditor = ({ disableMention, initialText, placeholderText, onSubmit }: Props) => {
  const [mentionedPeople, setMentionedList] = useState<Array<RegisteredUser>>([]);
  const removeAllMentionedPeople = () => setMentionedList([]);

  const handleSubmit = async (values: ThreadCommonPayload) => {
    try {
      await onSubmit(values);
    } catch (e) {
      // react-query mutate error
      // TODO: 예외 상황을 유저에게 알리기
      alert(e);

      // 정상 submit이 아니므로 mention 초기화 불가
      return;
    }

    removeAllMentionedPeople();
  };

  return (
    <div className="relative flex flex-col w-full gap-1">
      {!disableMention && <MentionInput chosenList={mentionedPeople} onChoose={setMentionedList} />}
      <EditorForm
        onSubmit={handleSubmit}
        initialText={initialText}
        placeholderText={placeholderText}
      />
    </div>
  );
};

export default CommonThreadEditor;
