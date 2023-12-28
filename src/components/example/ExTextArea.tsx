import TextEdit from "@/components/Common/TextEdit.tsx";

const ExTextArea = () => {
  const userName = undefined;
  const postId = "1";
  const channelId = "2";

  return (
    <div>
      <div className="p-20">
        {/* post-create*/}
        <TextEdit
          contentType="post"
          submitType="create"
          postId={postId}
          userName={userName}
          channelId={channelId}
        />
        {/* post-patch*/}
        <TextEdit
          contentType="post"
          submitType="patch"
          postId={postId}
          userName={userName}
          channelId={channelId}
        />
        {/* comment*/}
        <TextEdit
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
