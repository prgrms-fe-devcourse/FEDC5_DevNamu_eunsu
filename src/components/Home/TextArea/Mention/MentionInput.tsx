import { FormEvent, useRef, useState, KeyboardEvent, useEffect } from "react";

import { Input } from "@/components/ui/input.tsx";

import MentionList from "@/components/Home/TextArea/Mention/MentionList.tsx";
import UserBadgeList from "@/components/Home/TextArea/Mention/UserBadgeList.tsx";
import autoComplete from "@/lib/autoComplete.ts";
import { MyType, USER_LIST } from "@/constants/dummyData.ts";

const MentionInput = () => {
  const [mentionList, setMentionList] = useState<Array<MyType>>([]);
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusIdx, setFocusIdx] = useState(-1);

  const searchPeople = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { search } = autoComplete<MyType>({ list: USER_LIST, key: "name" });
    const list = search(event.currentTarget.value.trim());
    list && setMentionList(list);
  };

  const emptyUserInput = () => {
    if (!inputRef.current) return;
    setMentionList([]);
    inputRef.current.value = "";
  };

  const handleAddChoiceList = (people: MyType) => {
    setChoiceList((prev) => [...prev, people]);
    emptyUserInput();
  };

  const handleDeleteChoiceList = (people: MyType) => {
    const newChoiceList = [...choiceList].filter(
      ({ name, userId }) => !(name === people.name && userId === people.userId),
    );
    setChoiceList(newChoiceList);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const mentionLength = mentionList.length;

    if (mentionLength <= 0 || !inputRef.current) return;
    if (event.nativeEvent.isComposing) return;

    switch (event.key) {
      case "ArrowDown":
        setFocusIdx((prev) => (prev + 1) % mentionLength);
        break;
      case "ArrowUp":
        setFocusIdx((prev) => (prev - 1 + mentionLength) % mentionLength);
        break;
      case "Enter":
        setChoiceList((prev) => [
          ...prev,
          { name: mentionList[focusIdx].name, userId: mentionList[focusIdx].userId },
        ]);
        emptyUserInput();
        break;
    }
  };

  useEffect(() => {
    setFocusIdx(0);
  }, [mentionList]);

  return (
    <div>
      <UserBadgeList users={choiceList} onClick={handleDeleteChoiceList} />

      <Input
        type="text"
        onChange={searchPeople}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="멘션할 대상을 선택해주세요."
      />

      <MentionList users={mentionList} onClick={handleAddChoiceList} focusIdx={focusIdx} />
    </div>
  );
};

export default MentionInput;
