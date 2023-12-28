import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input.tsx";

import trie, { MyType } from "@/lib/trie.ts";

const MentionInput = () => {
  const [mentionList, setMentionList] = useState<Array<MyType>>([]);

  const searchPeople = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const list = trie.search(e.currentTarget.value.trim());
    list && setMentionList(list);
  };

  return (
    <div>
      <Input type="text" onChange={searchPeople} />
      {mentionList && (
        <div>
          {mentionList.map(({ name, userId }) => {
            return <p key={userId}>{name}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default MentionInput;
