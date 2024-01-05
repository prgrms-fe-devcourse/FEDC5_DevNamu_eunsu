import EditorTextArea from "@/components/common/EditorTextArea.tsx";

const ExEditorTextArea = () => {
  const nickname = "Zㅣ존Zㅐ훈";
  const channelId = "6593e24a3c180849df6d07a3"; // 테스트용 데브나무 전체 채널 2
  const postId = "659379f479fd2531a0091d62"; // {"content":"알겠죠~?"} 게시물

  const createThreadProps = {
    channelId,
  };

  // TODO : [24/1/5] 이전 content 넣는 거 아직 구현 안됐습니다.
  const patchThreadProps = {
    prevContent: "알겠죠~?",
    postId,
  };

  const commentProps = {
    postId,
  };

  return (
    <div className="flex h-screen w-full flex-grow items-center justify-center">
      <div className="flex-grow">
        <p>create Thread</p>
        <EditorTextArea isMention={true} nickname={nickname} editorProps={createThreadProps} />
      </div>
      <div className="flex-grow">
        <p>patch Thread</p>
        <EditorTextArea isMention={true} nickname={nickname} editorProps={patchThreadProps} />
      </div>
      <div className="flex-grow">
        <p>comment Thread</p>
        <EditorTextArea isMention={true} nickname={nickname} editorProps={commentProps} />
      </div>
    </div>
  );
};

export default ExEditorTextArea;
