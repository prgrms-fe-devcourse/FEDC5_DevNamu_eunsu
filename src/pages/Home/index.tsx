import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

const HomePage = () => {
  const { threads, channelId } = useThreadsByChannel();

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <main className="w-full max-w-4xl px-4">{threads && <ThreadList threads={threads} />}</main>
      <div className="w-full max-w-4xl px-4">
        <EditorTextArea
          isMention={false}
          contentType="post"
          submitType="create"
          postId=""
          channelId={channelId}
          nickName=""
        />
      </div>
    </div>
  );
};

export default HomePage;
