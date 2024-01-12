import { useInfiniteQuery } from "@tanstack/react-query";

import useSelectedThreadStore from "@/stores/thread";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
// import useThreadsByChannel from "@/hooks/api/useThreadsByChannel";
import ChannelNavigationMenu from "@/components/Home/ChannelNavigationMenu";
import ThreadDetailView from "@/components/common/thread/ThreadDetailView";
import { cn } from "@/lib/utils";
import { getThreadsByChannelId } from "@/apis/thread/queryFn";
import EmptyThread from "@/components/common/myactivate/EmptyThread";
import useGetChannelDetails from "@/apis/channel/useGetChannelDetails";
import ThreadList from "@/components/Home/ThreadList";
import EditorTextArea from "@/components/common/EditorTextArea";

const HomePage = () => {
  const channelName = location.pathname.split("/").pop() || "compliment";

  const { channelDetails } = useGetChannelDetails(channelName);
  const totalPostsCount = channelDetails?.posts.length || 0;

  const { user } = useGetUserInfo();
  // const { threads, channelId, channelName } = useThreadsByChannel();
  const { selectedThreadId, selectThreadId } = useSelectedThreadStore((state) => state);

  const handleCloseThreadDetail = () => {
    selectThreadId(undefined);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["threads"],
    queryFn: ({ pageParam = 0 }) => {
      return getThreadsByChannelId("659fc5d48c18254706ca08bf", pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;

      const { nextPage } = lastPage[0];

      console.log(nextPage);
      if (nextPage < totalPostsCount) {
        return nextPage + 6;
      }

      return undefined;
    },
    initialPageParam: 0,
  });

  const allThreads = data?.pages.flatMap((page) => page);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={cn(
          "duration-600 mt-12 flex flex-col items-center justify-center transition",
          selectedThreadId ? "xl:translate-x-[-180px]" : "",
        )}
      >
        <div className="w-full max-w-4xl px-4">
          <ChannelNavigationMenu />
        </div>
        <div className="w-full max-w-4xl px-4">
          <main className="flex min-h-[calc(100vh-300px)] flex-col rounded-sm border border-t-0 border-solid">
            <div className="flex min-h-full flex-1 items-center justify-center ">
              {!allThreads && (
                <EmptyThread type="threads" className="min-h-[calc(100vh-250px)] w-full" />
              )}
            </div>
            {allThreads && (
              <ThreadList
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                threads={allThreads}
              />
            )}
          </main>
          <EditorTextArea
            isMention={true}
            nickname={user?.nickname || "익명의 프롱이"}
            editorProps={{ channelId: "659fc5d48c18254706ca08bf" }}
          />
        </div>
      </div>

      <div>
        {selectedThreadId && (
          <ThreadDetailView
            className="fixed right-0 top-0 bg-white"
            threadId={selectedThreadId}
            onClose={handleCloseThreadDetail}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
