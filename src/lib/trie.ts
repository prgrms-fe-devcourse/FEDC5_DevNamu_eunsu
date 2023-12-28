import TrieSearch from "trie-search";

const USER_LIST = [
  { name: "김성빈", userId: "1" },
  { name: "김재민", userId: "2" },
  { name: "백윤서", userId: "3" },
  { name: "이재준", userId: "4" },
  { name: "조재훈", userId: "5" },
];

export type MyType = {
  name: string;
  userId: string;
};

const trie: TrieSearch<MyType> = new TrieSearch<MyType>("name", {
  splitOnRegEx: /(?<=\p{Script=Hangul})/u,
});

trie.addAll(USER_LIST);

export default trie;
