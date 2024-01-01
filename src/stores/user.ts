import { create } from "zustand";

interface State {
  user: StoredUser | null;
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  nickname: string;
  token: string;
  isLoggedIn: boolean;
}

interface Action {
  updateUser: (user: StoredUser) => void;
  logout: () => void;
}

const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
}));

export default useUserStore;
