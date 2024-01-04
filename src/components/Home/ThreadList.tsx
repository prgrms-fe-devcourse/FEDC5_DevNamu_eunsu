import { useEffect, useRef } from "react";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  const threadListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!threadListRef.current) return;

    threadListRef.current.scrollTop = threadListRef.current.scrollHeight;
  }, [threads]);

  return (
    <ul
      ref={threadListRef}
      className="max-h-700pxr min-h-700pxr overflow-auto rounded-sm border border-t-0 pt-22pxr"
    >
      {threads.map(({ _id, createdAt, title, author }) => (
        <ThreadListItem key={_id} id={_id} createdAt={createdAt} title={title} author={author} />
      ))}
    </ul>
  );
};

export default ThreadList;
