import { useQuery } from "@tanstack/react-query";

import api from "@/apis/core";

import { Thread } from "@/types/thread";

import ThreadCreateEditor from "../Home/ThreadCreateEditor";
import ThreadUpdateEditor from "../Home/ThreadUpdateEditor";
import CommentCreateEditor from "../comments/CommentCreateEditor";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";

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

const PostDetailArea = ({ postId }: { postId: string }) => {
  const { data, isPending } = useThreadDetail(postId);

  console.log("postId:", postId, "data:", data);

  if (isPending) {
    return <div>"스레드 로딩 중..."</div>;
  }

  return (
    <div className="flex flex-col h-screen p-4 overflow-auto bg-gray-300">
      <div>[현재 테스트 대상 스레드]</div>
      <div>본문: {data?.title}</div>
      <hr />
      <div>
        댓글:
        <ol className="flex flex-col gap-4 p-4">
          {data?.comments.map((comment, idx) => (
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

  const { user, isLoggedIn, hasNickname } = useGetUserInfo();

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
        <PostDetailArea postId={postId} />
        <div className="flex-grow">
          <div>
            <p>create Thread</p>
            <ThreadCreateEditor channelId={channelId} />
          </div>
          <div>
            <p>patch Thread</p>
            <ThreadUpdateEditor channelId={channelId} postId={postId} />
          </div>
          <div>
            <p>comment Thread</p>
            <CommentCreateEditor postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExEditorTextArea;
