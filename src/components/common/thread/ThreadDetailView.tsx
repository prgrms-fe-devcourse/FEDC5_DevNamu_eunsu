import { XIcon } from "lucide-react";

import { Thread } from "@/types/thread";

import ThreadListItem from "./ThreadListItem";
import CommentListItem from "./CommentListItem";

interface Props {
  thread: Thread;
  onClose: () => void;
}

// 중복 코드. 출처: src/components/MyThreads/MyThreadsItem.tsx
const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
};

const ThreadDetailView = ({ thread, onClose }: Props) => {
  return (
    <div className="flex flex-col h-screen px-6 py-4 overflow-auto list-none min-w-500pxr">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-700">스레드</h2>
          <p className="text-sm text-muted-foreground">#{channelMap[thread.channel.name]}게시판</p>
        </div>
        <button onClick={onClose}>
          <XIcon className="text-gray-500" />
        </button>
      </div>
      <ThreadListItem {...thread} id={thread._id} channelId={thread.channel._id} />
      <div className="flex items-center gap-2 mx-2">
        <span className="text-gray-500">{thread.comments.length}개의 댓글</span>
        <hr className="flex-1" />
      </div>
      <div>
        <ol className="flex flex-col gap-4">
          {thread.comments.map((comment) => (
            <CommentListItem key={comment._id} comment={comment} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ThreadDetailView;
