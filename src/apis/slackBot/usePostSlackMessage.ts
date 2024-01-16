import { useMutation } from "@tanstack/react-query";

import { postMessageSlackBot } from "@/apis/slackBot/queryFn.ts";

const usePostSlackMessage = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: postMessageSlackBot,
  });

  return {
    sendMessageBySlackBot: mutate,
    ...rest,
  };
};

export default usePostSlackMessage;
