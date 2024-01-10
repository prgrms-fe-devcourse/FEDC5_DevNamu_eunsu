import { create } from "zustand";

interface ThreadStore {
  selectedThreadId: string | undefined;
  selectThreadId: (threadId: string | undefined) => void;
}

const useSelectedThreadStore = create<ThreadStore>((set) => ({
  selectedThreadId: undefined,
  selectThreadId: (threadId) => set({ selectedThreadId: threadId }),
}));

export default useSelectedThreadStore;
