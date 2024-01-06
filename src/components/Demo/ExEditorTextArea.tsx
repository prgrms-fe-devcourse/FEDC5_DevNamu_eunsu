import { useQuery } from "@tanstack/react-query";

import api from "@/apis/core";

import { Thread } from "@/types/thread";

import CommonThreadEditor from "../common/Editor";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useUpdateThread from "@/hooks/api/useUpdateThread";
import useCreateThread from "@/hooks/api/useCreateThread";
import useCreateComment from "@/hooks/api/useCreateComment";

const useThreadDetail = (postId: string) => {
  console.log("postId:", postId);
  return useQuery({
    queryKey: ["thread", postId],
    queryFn: () =>
      api.get<Thread>({
        url: `/posts/${postId}`,
      }),
  });
};

const PostDetailArea = ({ thread }: { thread?: Thread }) => {
  if (!thread) {
    return <div>"스레드 로딩 중..."</div>;
  }

  return (
    <div className="flex flex-col h-screen p-4 overflow-auto bg-gray-300">
      <div>[현재 테스트 대상 스레드]</div>
      <div>본문: {thread.title}</div>
      <hr />
      <div>
        댓글:
        <ol className="flex flex-col gap-4 p-4">
          {thread.comments.map((comment, idx) => (
            <li key={idx} className="flex flex-col gap-2 border-2 border-gray-500">
              <div>작성자: {comment.author.fullName}</div>
              <div>내용: {comment.comment}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const ExEditorTextArea = () => {
  const channelId = "658d50d74f228a47fec343bd"; // 칭찬게시판
  const postId = "65982e1bf226073f4c8a0da2"; // 이재준 "test"

  const { data: thread } = useThreadDetail(postId);
  const parsedThreadBody = thread && JSON.parse(thread.title).content;

  console.log("parsedThreadBody:", parsedThreadBody);

  const { user, isLoggedIn, hasNickname } = useGetUserInfo();

  // 각각의 onSubmit
  const createComment = useCreateComment(postId);
  const updateThread = useUpdateThread(channelId, postId);
  const createThread = useCreateThread(channelId);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <div className="flex-grow-0 p-4 bg-blue-300">
          <div>로그인은 seongbin9786@gmail.com / 12341234 로 하세요</div>
          <div>로그인 후에도 새로고침 안 하면 정보 갱신이 안 됨 (....???)</div>
          <div>로그인 여부: {String(isLoggedIn)}</div>
          <div>닉네임 보유 여부: {String(hasNickname)}</div>
          <div>닉네임: {user?.nickname}</div>
        </div>
        <PostDetailArea thread={thread} />
        <div className="flex flex-col flex-grow gap-4">
          <div>
            <p>create Thread</p>
            <CommonThreadEditor onSubmit={createThread} />
          </div>
          <div>
            <p>patch Thread</p>
            {/* 최초로 전달한 parsedThreadBody 값이 상태의 초기값으로 쓰여서, 로딩 중일 때는 전달하면 안 됨 (실제 페이지에서는 항상 값이 로딩된 상태겠지만) */}
            {/* submit 후에 값이 다시 채워지지 않는데, 이것은 실제 페이지에서는 이미 전송하고 난 후에는 Thread 본문으로 변경하면서 언마운트하므로 문제 없음 */}
            {parsedThreadBody && (
              <CommonThreadEditor onSubmit={updateThread} initialText={parsedThreadBody} />
            )}
          </div>
          <div>
            <p>comment Thread</p>
            <CommonThreadEditor onSubmit={createComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExEditorTextArea;
