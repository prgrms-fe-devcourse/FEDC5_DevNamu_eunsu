import { create } from "zustand";

interface State {
  isOpen: boolean;
}

interface Action {
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<State & Action>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

export default useModalStore;
