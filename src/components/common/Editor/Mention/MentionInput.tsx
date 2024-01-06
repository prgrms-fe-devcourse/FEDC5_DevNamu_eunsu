import {
  FormEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { Input } from "@/components/ui/input.tsx";

import AutoCompleteMentionList from "./AutoCompleteMentionList";
import UserBadgeList from "./UserBadgeList";

import autoComplete from "@/lib/autoComplete.ts";
import { RegisteredUser, USER_LIST } from "@/constants/dummyData.ts";

interface Props {
  chosenList: RegisteredUser[];
  onChoose: Dispatch<SetStateAction<RegisteredUser[]>>;
}

const MentionInput = ({ chosenList, onChoose }: Props) => {
  const [autocompleteList, setAutocompleteList] = useState<Array<RegisteredUser>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusIndex, setFocusIndex] = useState(-1);

  const searchPeople = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { search } = autoComplete<RegisteredUser>({ list: USER_LIST, key: "name" });
    const list = search(event.currentTarget.value.trim());
    list && setAutocompleteList(list);
  };

  const emptyUserInput = () => {
    if (!inputRef.current) return;
    setAutocompleteList([]);
    inputRef.current.value = "";
  };

  const addToChosenPeople = (people: RegisteredUser) => {
    const isDuplication = chosenList.find(
      ({ name, userId }) => name === people.name && userId === people.userId,
    );

    if (!isDuplication) {
      onChoose((prev) => [...prev, people]);
    }

    emptyUserInput();
  };

  const handleDeleteChoiceList = (people: RegisteredUser) => {
    const newChoiceList = [...chosenList].filter(
      ({ name, userId }) => !(name === people.name && userId === people.userId),
    );
    onChoose(newChoiceList);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const mentionLength = autocompleteList.length;

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
        addToChosenPeople(autocompleteList[focusIndex]);
        break;
    }
  };

  useEffect(() => {
    setFocusIndex(0);
  }, [autocompleteList]);

  return (
    <div className="relative">
      <UserBadgeList users={chosenList} onClick={handleDeleteChoiceList} />

      <Input
        type="text"
        onChange={searchPeople}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="멘션할 대상을 선택해주세요."
      />

      <AutoCompleteMentionList
        users={autocompleteList}
        onClick={addToChosenPeople}
        focusIndex={focusIndex}
      />
    </div>
  );
};

export default MentionInput;
