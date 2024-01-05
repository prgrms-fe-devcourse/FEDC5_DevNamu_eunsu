import { useState } from "react";

import { User } from "@/types/user";

import EditorForm, { EditorFormValues } from "./EditorForm";

import MentionInput from "@/components/common/Mention/MentionInput.tsx";
import { MyType } from "@/constants/dummyData.ts";

interface Props {
  disableMention?: boolean;
  user?: User | null;
  onSubmit: (formValues: EditorFormValues) => void;
}

const EditorTextArea = ({ disableMention, onSubmit }: Props) => {
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);

  return (
    <div className="relative flex flex-col w-full gap-1">
      {!disableMention && <MentionInput choiceList={choiceList} onChoose={setChoiceList} />}
      <EditorForm onSubmit={onSubmit} />
    </div>
  );
};

export default EditorTextArea;
