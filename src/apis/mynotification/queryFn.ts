import api from "@/apis/core";

import { Notification } from "@/types/notification";

export const getMyNotification = () => api.get<Notification[]>({ url: `/notifications` });

export default getMyNotification;
