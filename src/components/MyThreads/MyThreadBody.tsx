import useThreadStore from "@/stores/thread";

import { parseTitleOrComment } from "@/utils/parsingJson";

import { Thread, Comment } from "@/types/thread.ts";

import EmptyThread from "../common/myactivate/emptyThread";

import MyThreadItem from "./MyThreadItem";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useListedThreadsAndComments from "@/hooks/api/useListedThreadsAndComments";

const DEFAULT_VALUE = "658f0f92c31af67084101253";
//TODO: Comments는 API에서 GET으로 받아올 수 없는 문제 처리 논의 (2023.12.30)

const isComment = (props: Thread | Comment): props is Comment => {
  return "comment" in props;
};

const MyThreadBody = () => {
  const { user } = useGetUserInfo();
  //TODO: 현재는 비로그인 시에도 list목록이 보이게 id 직접 넣어줬지만, 비로그인시 동작 논의(2024.01.02)

  const selectThreadId = useThreadStore((state) => state.selectThreadId);

  const handleClickMyThreadItem = (threadId: string) => () => {
    selectThreadId(threadId);
  };

  const id = user ? user._id : DEFAULT_VALUE;
  const { listedThreadsAndComments, isPending } = useListedThreadsAndComments(id);
  if (isPending) {
    return <div>loading...</div>;
  }
  if (listedThreadsAndComments.length === 0) {
    return <EmptyThread type="thread" />;
  }

  return (
    <main className="p-10pxr">
      {/*TODO : [24/1/9] 더 깔끔하게 작성할 것*/}
      {listedThreadsAndComments?.map((commentsProps) => {
        const { _id, createdAt } = commentsProps;

        if (isComment(commentsProps)) {
          const { comment, post } = commentsProps;
          return (
            <MyThreadItem
              key={_id}
              type={"comment"}
              createdAt={createdAt}
              comment={comment}
              onClick={handleClickMyThreadItem(post)}
            />
          );
        }

        // TODO: 파싱하는 로직은 뷰에서 분리하기 (2024.01.04)
        const { title, channel } = commentsProps;
        const { content } = parseTitleOrComment(title);

        return (
          <MyThreadItem
            key={_id}
            type={"post"}
            channel={channel?.name}
            title={content}
            createdAt={createdAt}
            onClick={handleClickMyThreadItem(_id)}
          ></MyThreadItem>
        );
      })}
    </main>
  );
};

export default MyThreadBody;
