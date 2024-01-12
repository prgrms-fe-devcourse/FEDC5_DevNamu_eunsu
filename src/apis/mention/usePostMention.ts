import { useMutation } from "@tanstack/react-query";

import { createMention } from "@/apis/mention/queryFn.ts";

// TODO: [24/1/6] error handling 공통으로 뺼 것
export const usePostMention = () => {
  return useMutation({
    mutationFn: createMention,
  });
};
