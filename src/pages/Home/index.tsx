import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadList from "@/components/Home/ThreadList";
import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";

const HomePage = () => {
  const { threads } = useThreadsByChannel();

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
      <main className="w-full max-w-4xl px-4">{threads && <ThreadList threads={threads} />}</main>
    </div>
  );
};

export default HomePage;
