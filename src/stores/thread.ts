import { create } from "zustand";

interface ThreadStore {
  selectedThreadId: string | null;
  selectThreadId: (threadId: string | null) => void;
}

const useSelectedThreadStore = create<ThreadStore>((set) => ({
  selectedThreadId: null,
  selectThreadId: (threadId) => set({ selectedThreadId: threadId }),
}));

export default useSelectedThreadStore;
