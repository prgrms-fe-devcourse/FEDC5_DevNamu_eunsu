import { create } from "zustand";

interface NotificationStore {
  hasNewNotification: boolean;
  checkNotification: (notification: boolean) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  hasNewNotification: false,
  checkNotification: (notification: boolean) => set({ hasNewNotification: notification }),
}));

export default useNotificationStore;
