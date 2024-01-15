import { create } from "zustand";

type ModalType = "Login" | "Register" | "Profile";

interface State {
  isOpenLoginModal: boolean;
  isOpenRegisterModal: boolean;
  isOpenProfileModal: boolean;
}

interface Action {
  toggleModal: (type: ModalType) => void;
}

const useModalStore = create<State & Action>((set) => ({
  isOpenLoginModal: false,
  isOpenRegisterModal: false,
  isOpenProfileModal: false,
  toggleModal: (type: ModalType) =>
    set((state) => {
      if (Object.keys(state).includes(`isOpen${type}Modal`)) {
        return { ...state, [`isOpen${type}Modal`]: !state[`isOpen${type}Modal`] };
      }
      return state;
    }),
}));

export default useModalStore;
