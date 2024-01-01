import TrieSearch from "trie-search";

import { USER_LIST } from "@/constants/dummyData.ts";

export type MyType = {
  name: string;
  userId: string;
};

const trie: TrieSearch<MyType> = new TrieSearch<MyType>("name", {
  splitOnRegEx: /(?<=\p{Script=Hangul})/u,
});

trie.addAll(USER_LIST);

export default trie;
