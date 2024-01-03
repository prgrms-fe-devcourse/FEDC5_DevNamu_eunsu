import MyThreadDescription from "@/components/MyThreads/MyThreadDescription";
import MyThreadBody from "@/components/MyThreads/MyThreadBody";

const MyThreadsPage = () => {
  return (
    <div className="h-screen overflow-auto p-30pxr">
      <MyThreadDescription />
      <MyThreadBody />
    </div>
  );
};

export default MyThreadsPage;
