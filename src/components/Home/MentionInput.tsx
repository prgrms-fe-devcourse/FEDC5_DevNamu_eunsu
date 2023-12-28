import { FormEvent, useRef, useState } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";

import trie, { MyType } from "@/lib/trie.ts";

const MentionInput = () => {
  const [mentionList, setMentionList] = useState<Array<MyType>>([]);
  const [choiceList, setChoiceList] = useState<Array<MyType>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      {!!choiceList.length && (
        <div className="mb-2 flex gap-2">
          {choiceList.map(({ name, userId }) => {
            return (
              <Badge key={userId} onClick={() => handleDeleteChoiceList({ name, userId })}>
                {name}
              </Badge>
            );
          })}
        </div>
      )}

      <Input type="text" onChange={searchPeople} ref={inputRef} />

      {!!mentionList.length && (
        <div className="mt-2 overflow-hidden scroll-auto border p-2">
          {mentionList.map(({ name, userId }, idx) => {
            return (
              <div key={userId}>
                <p
                  onClick={() => handleAddChoiceList({ name, userId })}
                  className="hover:font-bold"
                >
                  {name}
                </p>
                {idx !== mentionList.length - 1 && <Separator className="my-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MentionInput;
