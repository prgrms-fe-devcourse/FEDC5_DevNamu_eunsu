import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";

const HomePage = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <ChannelNavigationMenu />
      </div>
    </div>
  );
};

export default HomePage;
