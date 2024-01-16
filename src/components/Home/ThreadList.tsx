import { useCallback, useEffect, useRef } from "react";

import useSelectedThreadStore from "@/stores/thread";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

interface Props {
  threads: Thread[];
  channelName: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const ThreadList = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  threads,
  channelName,
}: Props) => {
  const threadListItemRef = useRef(null);
  const threadListRef = useRef<HTMLUListElement>(null);

  console.log("threadList-1", threads);

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

  const handleScroll = useCallback(() => {
    if (threadListRef.current) {
      localStorage.setItem(
        `scrollPosition-${channelName}`,
        String(threadListRef.current.scrollTop),
      );
    }
  }, [channelName]);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(`scrollPosition-${channelName}`);
    if (savedScrollPosition && threadListRef.current) {
      threadListRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }

    if (threadListRef.current) {
      threadListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (threadListRef.current) {
        threadListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [channelName, handleScroll]);

  return (
    <div>
      <ul
        ref={threadListRef}
        className="flex h-[calc(100vh-250px)] flex-col-reverse overflow-auto pt-80pxr"
      >
        {threads.reverse().map((thread) => (
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
