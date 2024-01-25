import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import MentionInput from "@/components/common/mention/MentionInput.tsx";
import ContentTextArea from "@/components/common/editor/EditorTextArea.tsx";

interface Props {
  children?: ReactNode;
}
export const EditorContext = createContext<{
  mentionedList: UserDBProps[];
  setMentionedList: Dispatch<SetStateAction<UserDBProps[]>>;
}>({ mentionedList: [], setMentionedList: () => {} });

const EditorContextProvider = ({ children }: Props) => {
  const [mentionedList, setMentionedList] = useState<Array<UserDBProps>>([]);
  const providerValue = { mentionedList, setMentionedList };

  return <EditorContext.Provider value={providerValue}>{children}</EditorContext.Provider>;
};

EditorContextProvider.Mention = MentionInput;
EditorContextProvider.TextArea = ContentTextArea;

export default EditorContextProvider;
