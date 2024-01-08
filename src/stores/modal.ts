import { create } from "zustand";

type ModalType = "Login" | "Register" | "Setting";

interface State {
  isOpenLoginModal: boolean;
  isOpenRegisterModal: boolean;
  isOpenSettingModal: boolean;
}

interface Action {
  openModal: (type: ModalType) => void;
  closeModal: (type: ModalType) => void;
}

const useModalStore = create<State & Action>((set) => ({
  isOpenLoginModal: false,
  isOpenRegisterModal: false,
  isOpenSettingModal: false,
  openModal: (type: ModalType) => set((state) => {
    if (Object.keys(state).includes(`isOpen${type}Modal`)) {
      return { ...state, [`isOpen${type}Modal`]: true }
    } return state;
  }),
  closeModal: (type: ModalType) => set((state) => {
    if (Object.keys(state).includes(`isOpen${type}Modal`)) {
      return { ...state, [`isOpen${type}Modal`]: false }
    } return state;
  })
}));

export default useModalStore;
