import axios from "axios";

import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

export const postMessageSlackBot = ({ mentionedList }: { mentionedList: UserDBProps[] }) => {
  const mentionMessage = mentionedList.map(({ slackId }) => `<@${slackId}>`).join(", ");
  const nameList = mentionedList.map(({ name }) => name).join(", ");

  const message = `${mentionMessage}님! 익명의 누군가가 ${nameList}님을 멘션하였습니다. <https://devnamu.kro.kr|데브나무>에 가입하시고 내용을 확인하세요!`;

  return axios({
    method: "post",
    url: import.meta.env.VITE_CORS_PROXY + import.meta.env.VITE_SLECT_HOOKS_URL, // url에 webhookurl 을 넣어주세요.
    headers: {
      "Content-Type": "application/json",
      "x-cors-api-key": import.meta.env.VITE_CORS_PROXY_KEY,
    },
    data: {
      text: message,
    },
  });
};
