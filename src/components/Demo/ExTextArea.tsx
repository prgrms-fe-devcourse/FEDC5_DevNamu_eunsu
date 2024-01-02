import TextEdit from "@/components/Common/TextEdit.tsx";

const ExTextArea = () => {
  const userName = undefined;
  const postId = "1";
  const channelId = "2";

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="relative flex h-screen w-800pxr justify-center" id="parent">
        {/* post-create*/}
        <TextEdit
          isMention={true}
          contentType="post"
          submitType="create"
          postId={postId}
          userName={userName}
          channelId={channelId}
        />
      </div>
    </div>
  );
};
export default ExTextArea;
