import { useEffect, useRef } from "react";

import useThreadStore from "@/stores/thread";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  const threadListRef = useRef<HTMLUListElement>(null);

  const { selectThreadId } = useThreadStore((state) => state);

  const handleClickThread = (threadId: string) => () => {
    selectThreadId(threadId);
  };

  useEffect(() => {
    if (threadListRef.current) {
      threadListRef.current.scrollTop = threadListRef.current.scrollHeight;
    }
  }, []);

  return (
    <div>
      <ul
        ref={threadListRef}
        className="h-[calc(100vh-250px)] overflow-y-auto rounded-sm border border-t-0 pt-80pxr"
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
