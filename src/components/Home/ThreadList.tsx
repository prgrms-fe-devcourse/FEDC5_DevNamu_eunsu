import { useEffect, useRef } from "react";

import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  const threadListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (threadListRef.current) {
      threadListRef.current.scrollTop = threadListRef.current.scrollHeight;
    }
  }, []);

  return (
    <ul
      ref={threadListRef}
      className="max-h-700pxr min-h-700pxr overflow-y-auto rounded-sm border border-t-0 pt-80pxr"
    >
      {threads.map(({ _id, createdAt, title, author, likes, channel }) => (
        <ThreadListItem
          onClick={() => {
            console.log(_id);
          }}
          key={_id}
          id={_id}
          createdAt={createdAt}
          title={title}
          author={author}
          likes={likes}
          channelId={channel._id}
        />
      ))}
    </ul>
  );
};

export default ThreadList;
