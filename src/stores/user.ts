import { create } from "zustand";

interface State {
  user: StoredUser | null;
}

// TODO: 스토어에 저장되는 유저 정보 줄여보기 (24.01.01)
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
