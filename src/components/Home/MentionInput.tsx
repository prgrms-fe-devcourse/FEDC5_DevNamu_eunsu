import { FormEvent, useRef, useState } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";

import trie, { MyType } from "@/lib/trie.ts";

const MentionInput = () => {
  const [mentionList, setMentionList] = useState<Array<MyType>>([]);
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLElement[]>([]);

  const searchPeople = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const list = trie.search(e.currentTarget.value.trim());
    list && setMentionList(list);
  };

  const handleAddChoiceList = (people: MyType) => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setChoiceList((prev) => [...prev, people]);
    setMentionList([]);
  };

  const handleDeleteChoiceList = (people: MyType) => {
    const newChoiceList = [...choiceList].filter(
      ({ name, userId }) => !(name === people.name && userId === people.userId),
    );
    setChoiceList(newChoiceList);
  };

  return (
    <div>
      {!!choiceList.length && <ChoiceList list={choiceList} onClick={handleDeleteChoiceList} />}

      <Input
        type="text"
        onChange={searchPeople}
        ref={inputRef}
        placeholder="멘션할 대상을 선택해주세요."
      />

      {!!mentionList.length && <MentionList list={mentionList} onClick={handleAddChoiceList} />}
    </div>
  );
};

export default MentionInput;

interface ListProps {
  list: MyType[];
  onClick: (people: MyType) => void;
}

const MentionList = ({ list, onClick }: ListProps) => {
  return (
    <div className="mt-2 overflow-hidden scroll-auto border p-2">
      {list.map(({ name, userId }, idx) => {
        return (
          <div key={userId} className="hover:bg-gray-100 focus:bg-gray-100">
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
