import { useRef } from "react";

import useSelectedThreadStore from "@/stores/thread";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

interface Props {
  threads: Thread[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const ThreadList = ({ threads, hasNextPage, isFetchingNextPage, fetchNextPage }: Props) => {
  const threadListItemRef = useRef(null);

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  const { selectThreadId } = useSelectedThreadStore((state) => state);

  const handleClickThread = (threadId: string) => () => {
    selectThreadId(threadId);
  };

  useIntersectionObserver({ target: threadListItemRef, handleIntersect });

  return (
    <div>
      <ul className="flex h-[calc(100vh-250px)] flex-col overflow-auto pt-80pxr">
        {threads.map((thread) => (
          <ThreadListItem
            key={thread._id}
            thread={thread}
            channelId={thread.channel._id}
            onClick={handleClickThread(thread._id)}
          />
        ))}
        <div ref={threadListItemRef}></div>
      </ul>
    </div>
  );
};

export default ThreadList;
