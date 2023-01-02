import { Thread } from "@/types/thread";

import ThreadListItem from "@/components/common/thread/ThreadListItem";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  return (
    <ul className="max-h-500pxr min-h-500pxr overflow-auto rounded-sm border border-t-0 py-10pxr">
      {threads.map(({ _id, createdAt, title, author }) => (
        <ThreadListItem id={_id} createdAt={createdAt} title={title} author={author} />
      ))}
    </ul>
  );
};

export default ThreadList;
