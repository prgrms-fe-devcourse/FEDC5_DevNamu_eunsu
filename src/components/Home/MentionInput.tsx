import { FormEvent, useRef, useState, KeyboardEvent, useEffect } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";

import trie, { MyType } from "@/lib/trie.ts";
import { cn } from "@/lib/utils.ts";

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

  const handleAddChoiceList = (people: MyType) => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setChoiceList((prev) => [...prev, people]);
    setMentionList([]);
    inputRef.current.value = "";
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
        setMentionList([]);
        inputRef.current.value = "";
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

interface ListProps {
  list: MyType[];
  onClick: (people: MyType) => void;
}

interface MentionListProps extends ListProps {
  focusIdx: number;
}

const MentionList = ({ list, onClick, focusIdx }: MentionListProps) => {
  return (
    <div className="mt-2 overflow-hidden scroll-auto border p-2">
      {list.map(({ name, userId }, idx) => {
        return (
          <div
            key={userId}
            className={cn(
              "hover:bg-gray-100 focus:bg-gray-100",
              focusIdx === idx ? "bg-gray-100" : "",
            )}
          >
            <p
              onClick={() => onClick({ name, userId })}
              className="cursor-pointer py-2 hover:font-bold focus:font-bold"
            >
              {name}
            </p>
            {idx !== list.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
};

const ChoiceList = ({ list, onClick }: ListProps) => {
  return (
    <div className="mb-2 flex gap-2">
      {list.map(({ name, userId }) => {
        return (
          <Badge key={userId} onClick={() => onClick({ name, userId })} className="cursor-pointer">
            {name}
          </Badge>
        );
      })}
    </div>
  );
};
