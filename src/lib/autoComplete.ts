import TrieSearch from "trie-search";

const autoComplete = <T>({ list, key }: { list: Array<T>; key: keyof T }) => {
  const trie: TrieSearch<T> = new TrieSearch<T>(key as string, {
    splitOnRegEx: /(?<=\p{Script=Hangul})/u,
  });
  trie.addAll(list);

  return {
    trie,
    search: (key: string) => trie.search(key),
    reset: trie.reset,
  };
};

export default autoComplete;
