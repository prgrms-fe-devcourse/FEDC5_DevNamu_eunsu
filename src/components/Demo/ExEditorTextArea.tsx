import ThreadCreateEditor from "../Home/ThreadCreateEditor";
import ThreadUpdateEditor from "../Home/ThreadUpdateEditor";
import CommentCreateEditor from "../common/thread/CommentCreateEditor";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";

const ExEditorTextArea = () => {
  const channelId = "658d50d74f228a47fec343bd"; // 칭찬게시판
  const postId = "65982e1bf226073f4c8a0da2"; // 이재준 "test"

  const { user, isLoggedIn, hasNickname } = useGetUserInfo();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow-0">
        <div>로그인은 seongbin9786@gmail.com / 12341234 로 하세요</div>
        <div>로그인 후에도 새로고침 안 하면 정보 갱신이 안 됨 (....???)</div>
        <div>로그인 여부: {String(isLoggedIn)}</div>
        <div>닉네임 보유 여부: {String(hasNickname)}</div>
        <div>닉네임: {user?.nickname}</div>
      </div>
      <div>
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
  );
};

export default ExEditorTextArea;
