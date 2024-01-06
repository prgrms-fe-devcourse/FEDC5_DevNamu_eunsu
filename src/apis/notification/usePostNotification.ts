import { useMutation } from "@tanstack/react-query";

import { createNotification } from "@/apis/notification/queryFn.ts";

export const usePostNotification = () => {
  // todo [24/1/2] : error handling 공통으로 뺼 것
  return useMutation({ mutationFn: createNotification });
};
