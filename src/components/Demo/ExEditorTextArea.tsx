import EditorTextArea from "@/components/common/EditorTextArea.tsx";

const ExEditorTextArea = () => {
  const nickname = "Zㅣ존Zㅐ훈";
  const postId = "659379f479fd2531a0091d62"; // {"content":"알겠죠~?"} 게시물

  const channelId = "6593e24a3c180849df6d07a3"; // 테스트용 데브나무 전체 채널 2
  const createThreadProps = { channelId };

  const patchThreadProps = {
    prevContent: "알겠죠~?",
    postId,
  };

  const commentProps = {
    channelName: "무능 게시판",
    postId: "659b4ae942677b4eb8c08e0f",
    postAuthorId: "65955240a178ac62e4022f0d",
  }; // channelName은 Post.channel.name 값 전달, postId는 Post.author._id 값 전달, postAuthorId는 Post.author._id 값 전달

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
