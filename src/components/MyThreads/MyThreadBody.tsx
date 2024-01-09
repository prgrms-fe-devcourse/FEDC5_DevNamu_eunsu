import { parseTitle } from "@/utils/parsingJson";

import MyThreadItem from "./MyThreadItem";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useListedThreadsAndComments from "@/hooks/api/useListedThreadsAndComments";

const DEFAULT_VALUE = "658f0f92c31af67084101253";
//TODO: Comments는 API에서 GET으로 받아올 수 없는 문제 처리 논의 (2023.12.30)

const MyThreadBody = () => {
  const { user } = useGetUserInfo();
  //TODO: 현재는 비로그인 시에도 list목록이 보이게 id 직접 넣어줬지만, 비로그인시 동작 논의(2024.01.02)

  const id = user ? user._id : DEFAULT_VALUE;
  const { listedThreadsAndComments, isPending } = useListedThreadsAndComments(id);
  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <main className="p-10pxr">
      {listedThreadsAndComments?.map(({ _id, channel, title, comment, createdAt }) => {
        // TODO: 파싱하는 로직은 뷰에서 분리하기 (2024.01.04)
        const { content } = title ? parseTitle(title) : "";
        const type = comment ? "comment" : "post";
        return (
          <MyThreadItem
            id={_id}
            type={type}
            channel={channel?.name}
            title={content}
            createdAt={createdAt}
            comment={comment}
          ></MyThreadItem>
        );
      })}
    </main>
  );
};

export default MyThreadBody;
