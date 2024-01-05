import EditorTextArea from "@/components/common/EditorTextArea.tsx";

const Demo = () => {
  const nickname = "";
  const channelId = "658d50d74f228a47fec343bd"; // 칭찬게시판id
  const postId = "659379f479fd2531a0091d62"; // {"content":"알겠죠~?"} 게시물

  return (
    <div>
      <div className="h-[90vh] w-400pxr">
        <p>Demo</p>
        <EditorTextArea
          isMention={true}
          contentType={"post"}
          submitType={"create"}
          nickname={nickname}
          postId={postId}
          channelId={channelId}
        />
      </div>
    </div>
  );
};

export default Demo;
