import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

const HomePage = () => {
  const { user } = useGetUserInfo();
  const { threads, channelId, channelName } = useThreadsByChannel();

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <div className="w-full max-w-4xl px-4">
        <main>{threads && <ThreadList threads={threads} />}</main>
        <EditorTextArea
          isMention={channelName !== "incompetent"}
          contentType="post"
          submitType="create"
          postId=""
          channelId={channelId}
          nickName={user?.nickname}
        />
      </div>
    </div>
  );
};

export default HomePage;
