import { XIcon } from "lucide-react";
import { MouseEvent } from "react";

import { Thread } from "@/types/thread";

import EditorTextArea from "../EditorTextArea";

import CommentListItem from "./CommentListItem";
import ThreadListItem from "./ThreadListItem";

import { cn } from "@/lib/utils";

interface Props {
  thread: Thread;
  onClose: (event: MouseEvent) => void;
  className?: string;
}

// 중복 코드. 출처: src/components/MyThreads/MyThreadsItem.tsx
const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
};

const ThreadDetailView = ({ thread, onClose, className }: Props) => {
  const handleClickDetailInner = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClickDetailInner}
      className={cn(
        "flex h-screen min-w-500pxr list-none flex-col overflow-auto border-l border-gray-200 px-4 py-5 shadow-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-700">스레드</h2>
          <p className="text-sm text-muted-foreground">#{channelMap[thread.channel.name]}게시판</p>
        </div>
        <button onClick={onClose}>
          <XIcon className="text-gray-500" />
        </button>
      </div>
      <ThreadListItem thread={thread} channelId={thread.channel._id} />
      <div className="mx-2 flex items-center gap-2">
        <span className="text-gray-500">{thread.comments.length}개의 댓글</span>
        <hr className="flex-1" />
      </div>
      <div>
        <ol className="flex flex-col gap-4">
          {thread.comments.map((comment) => (
            <CommentListItem key={comment._id} commentInfo={comment} />
          ))}
        </ol>
      </div>
      <div className="absolute bottom-10 right-0 w-full px-4">
        <EditorTextArea
          isMention={true}
          nickname={thread.nickname}
          editorProps={{
            channelName: thread.channel.name,
            postId: thread._id,
            postAuthorId: thread.author._id,
          }}
        />
      </div>
    </div>
  );
};

export default ThreadDetailView;
