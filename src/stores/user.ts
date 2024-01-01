import { create } from "zustand";

type State = {
  user: StoredUser | null;
};

interface StoredUser {
  id: string;
  email: string;
  name: string;
  nickname: string;
  token: string;
  isLoggedIn: boolean;
}

type Action = {
  updateUser: (user: StoredUser) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
}));

export default useUserStore;
