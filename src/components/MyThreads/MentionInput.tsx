import { FormEvent, useRef, useState, KeyboardEvent, useEffect } from "react";

import { Input } from "@/components/ui/input.tsx";

import trie, { MyType } from "@/lib/trie.ts";
import MentionList from "@/components/MyThreads/MentionList.tsx";
import ChoiceList from "@/components/MyThreads/ChoiceList.tsx";

const MentionInput = () => {
  const [mentionList, setMentionList] = useState<Array<MyType>>([]);
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusIdx, setFocusIdx] = useState(-1);

  const searchPeople = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const list = trie.search(event.currentTarget.value.trim());
    list && setMentionList(list);
  };

  const initInput = () => {
    if (!inputRef.current) return;
    setMentionList([]);
    inputRef.current.value = "";
  };

  const handleAddChoiceList = (people: MyType) => {
    setChoiceList((prev) => [...prev, people]);
    initInput();
  };

  const handleDeleteChoiceList = (people: MyType) => {
    const newChoiceList = [...choiceList].filter(
      ({ name, userId }) => !(name === people.name && userId === people.userId),
    );
    setChoiceList(newChoiceList);
  };

  const handleFocus = (event: KeyboardEvent<HTMLInputElement>) => {
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
        initInput();
        break;
    }
  };

  useEffect(() => {
    setFocusIdx(0);
  }, [mentionList]);

  return (
    <div>
      {!!choiceList.length && <ChoiceList list={choiceList} onClick={handleDeleteChoiceList} />}

      <Input
        type="text"
        onChange={searchPeople}
        onKeyDown={handleFocus}
        ref={inputRef}
        placeholder="멘션할 대상을 선택해주세요."
      />

      {!!mentionList.length && (
        <MentionList list={mentionList} onClick={handleAddChoiceList} focusIdx={focusIdx} />
      )}
    </div>
  );
};

export default MentionInput;
