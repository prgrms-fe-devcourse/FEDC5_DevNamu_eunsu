import axios from "axios";

import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";

interface Props {
  mentionedList: UserDBProps[];
}
export const postMessageSlackBot = ({ mentionedList }: Props) => {
  const memberList: UserDBProps[] = [];
  const notMemberList: UserDBProps[] = [];

  mentionedList.forEach((people) => {
    people.userId === import.meta.env.VITE_ADMIN_USERID
      ? notMemberList.push(people)
      : memberList.push(people);
  });

  const sendMessage = [];
  if (memberList.length)
    sendMessage.push(createMessage({ mentionedList: memberList }) + "에서 확인해주세요!");

  if (notMemberList.length)
    sendMessage.push(createMessage({ mentionedList: notMemberList }) + "에 가입해서 확인해주세요!");

  return Promise.all(sendMessage.map((message) => createAxios(message)));
};

const createMessage = ({ mentionedList }: Props) => {
  const mentionMessage = mentionedList.map(({ slackId }) => `<@${slackId}>`).join(", ");
  const nameList = mentionedList.map(({ name }) => name).join(", ");

  return `${mentionMessage}님! 익명의 누군가가 ${nameList}님을 멘션하였습니다.\n <https://devnamu.kro.kr|데브나무>`;
};

const createAxios = (message: string) => {
  // vercel error
  const url = import.meta.env.VITE_CORS_PROXY + import.meta.env.VITE_SLECT_HOOKS_URL;
  return axios({
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
      "x-cors-api-key": import.meta.env.VITE_CORS_PROXY_KEY,
    },
    data: {
      text: message,
    },
  });
};
