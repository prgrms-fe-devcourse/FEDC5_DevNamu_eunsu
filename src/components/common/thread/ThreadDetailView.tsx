import { XIcon } from "lucide-react";
import { MouseEvent } from "react";

import EditorTextArea from "../EditorTextArea";

import CommentListItem from "./CommentListItem";
import ThreadListItem from "./ThreadListItem";

import { cn } from "@/lib/utils";
import useGetThread from "@/apis/thread/useGetThread";
import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";
import useDeleteComment from "@/apis/comment/useDeleteComment.ts";

interface Props {
  threadId: string | undefined;
  onClose: (event: MouseEvent) => void;
  className?: string;
}

// 중복 코드. 출처: src/components/MyThreads/MyThreadsItem.tsx
const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
};

const ThreadDetailView = ({ threadId, onClose, className }: Props) => {
  const { user } = useGetUserInfo();
  const { thread } = useGetThread(threadId);
  const { deleteComment } = useDeleteComment(threadId);

  if (!thread) return;

  const handleClickDetailInner = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  return (
    <div
      onClick={handleClickDetailInner}
      className={cn(
        "flex h-screen min-w-500pxr max-w-500pxr list-none flex-col overflow-auto border-l border-gray-200 px-4 py-5 shadow-xl",
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

      <div className="mb-4">
        <ol className="flex flex-col gap-4">
          {thread.comments.map((comment) => (
            <CommentListItem
              key={comment._id}
              commentInfo={comment}
              onClose={handleDeleteComment}
              isAuthor={comment.author._id === user?._id}
            />
          ))}
        </ol>
      </div>

      <div className="w-full pl-2 pr-2">
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
