import { useMutation } from "@tanstack/react-query";

import { postMessageSlackBot } from "@/apis/slackBot/queryFn.ts";

const usePostMessage = () => {
  const { mutate, ...props } = useMutation({
    mutationFn: postMessageSlackBot,
  });

  return {
    sendMessageBySlackBot: mutate,
    ...props,
  };
};

export default usePostMessage;
