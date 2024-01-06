import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";

interface Props {
  payload: ThreadCommonPayload;
  nickname: string | undefined;
}

const formJsonStringify = ({ payload, nickname }: Props) => {
  const { anonymous, content } = payload;

  return JSON.stringify({
    content,
    nickname: anonymous ? ANONYMOUS_NICKNAME : nickname,
  });
};

export default formJsonStringify;
