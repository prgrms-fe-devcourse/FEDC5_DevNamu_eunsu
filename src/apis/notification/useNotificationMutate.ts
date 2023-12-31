import { useMutation } from "@tanstack/react-query";

import { createNotification } from "@/apis/notification/queryFn.ts";

export const useCreateNotificationMutate = () => {
  return useMutation({ mutationFn: createNotification, onError: () => {} });
};
