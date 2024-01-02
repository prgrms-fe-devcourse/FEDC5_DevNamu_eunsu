import TextEdit from "@/components/Common/TextEdit.tsx";

const ExTextArea = () => {
  // todo 24/1/2 : 닉네임 어디서 받아올지 미정. 일단은 textAreat 사용하는 곳에서 넘겨주는 형태로 구현
  const nickName = "";
  const channelId = "658d50d74f228a47fec343bd"; // 칭찬게시판id
  const postId = "659379f479fd2531a0091d62"; // {"content":"알겠죠~?"} 게시물

  return (
    <>
      <div className="flex h-screen w-full justify-center">
        <p> post 작성</p>
        <div className="relative flex h-screen w-400pxr justify-center" id="parent">
          <TextEdit
            isMention={true}
            contentType="post"
            submitType="create"
            postId={postId}
            nickName={nickName}
            channelId={channelId}
          />
        </div>
        <p> comment 작성</p>
        <div className="relative flex h-screen w-400pxr justify-center" id="parent">
          <TextEdit
            isMention={true}
            contentType="comment"
            submitType="create"
            postId={postId}
            nickName={nickName}
            channelId={channelId}
          />
        </div>
      </div>
    </>
  );
};
export default ExTextArea;
