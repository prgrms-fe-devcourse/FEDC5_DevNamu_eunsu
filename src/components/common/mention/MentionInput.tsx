import { FormEvent, useRef, useState, KeyboardEvent, useEffect, useContext } from "react";

import { Input } from "@/components/ui/input.tsx";

import AutoCompleteMentionList from "@/components/common/mention/AutoCompleteMentionList";
import UserBadgeList from "@/components/common/mention/UserBadgeList";
import autoComplete from "@/lib/autoComplete.ts";
import useUserListByDB, { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import { EditorContext } from "@/components/common/editor/presenter/EditorContextProvider.tsx";

const MentionInput = () => {
  const { mentionedList, setMentionedList } = useContext(EditorContext);
  const [autoCompleteList, setAutoCompleteList] = useState<Array<UserDBProps>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusIndex, setFocusIndex] = useState(-1);
  const { userListByDB } = useUserListByDB();
  const searchPeople = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { search } = autoComplete<UserDBProps>({ list: userListByDB, key: "name" });
    const list = search(event.currentTarget.value.trim());
    list && setAutoCompleteList(list);
  };

  const emptyUserInput = () => {
    if (!inputRef.current) return;
    setAutoCompleteList([]);
    inputRef.current.value = "";
  };

  const handleAddChoiceList = (user: UserDBProps) => {
    const isDuplication = mentionedList.find(({ slackId }) => slackId === user.slackId);

    if (!isDuplication) setMentionedList((prev) => [...prev, user]);

    gtag("event", "ui사용_Mention");
    emptyUserInput();
  };

  const handleDeleteChoiceList = (user: UserDBProps) => {
    const newChoiceList = [...mentionedList].filter(({ slackId }) => slackId !== user.slackId);
    setMentionedList(newChoiceList);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const mentionLength = autoCompleteList.length;

    if (mentionLength <= 0 || !inputRef.current) return;
    if (event.nativeEvent.isComposing) return;

    switch (event.key) {
      case "ArrowDown":
        setFocusIndex((prev) => (prev + 1) % mentionLength);
        break;
      case "ArrowUp":
        setFocusIndex((prev) => (prev - 1 + mentionLength) % mentionLength);
        break;
      case "Enter":
        handleAddChoiceList(autoCompleteList[focusIndex]);
        break;
    }
  };

  useEffect(() => {
    setFocusIndex(0);
  }, [autoCompleteList]);

  return (
    <div className="relative">
      <UserBadgeList users={mentionedList} onClick={handleDeleteChoiceList} />

      <Input
        type="text"
        onChange={searchPeople}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="멘션할 대상을 선택해주세요."
        className="text-base text-content-5 placeholder-content-1"
      />

      <AutoCompleteMentionList
        users={autoCompleteList}
        onClick={handleAddChoiceList}
        focusIndex={focusIndex}
      />
    </div>
  );
};

export default MentionInput;
