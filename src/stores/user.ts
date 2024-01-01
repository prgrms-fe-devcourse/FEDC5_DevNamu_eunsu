import { create } from "zustand";

type State = {
  user: User;
};

interface User {
  id: string;
  email: string;
  name: string;
  nickname: string;
  token: string;
}

type Action = {
  updateUser: (user: User) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: {
    id: "",
    email: "",
    name: "",
    nickname: "",
    token: "",
  },
  updateUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
