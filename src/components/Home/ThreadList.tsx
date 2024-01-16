import { useEffect, useRef } from "react";

import useSelectedThreadStore from "@/stores/thread";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  const threadListRef = useRef<HTMLUListElement>(null);

  const { selectThreadId } = useSelectedThreadStore((state) => state);

  const handleClickThread = (threadId: string) => () => {
    selectThreadId(threadId);
  };

  useEffect(() => {
    if (threadListRef.current && threads.length > 0) {
      threadListRef.current.scrollTop = threadListRef.current.scrollHeight;
    }
  }, [threads.length]);

  return (
    <div>
      <ul
        ref={threadListRef}
        className="flex h-[calc(100vh-250px)] flex-col overflow-y-auto pt-80pxr"
      >
        {threads.map((thread) => (
          <ThreadListItem
            key={thread._id}
            thread={thread}
            channelId={thread.channel._id}
            onClick={handleClickThread(thread._id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
