import { XIcon } from "lucide-react";
import { MouseEvent } from "react";

import EditorTextArea from "../EditorTextArea";

import CommentListItem from "./CommentListItem";
import ThreadListItem from "./ThreadListItem";

import { cn } from "@/lib/utils";
import useGetThread from "@/apis/thread/useGetThread";
import useGetUserInfo from "@/apis/auth/useGetUserInfo.ts";
import useDeleteComment from "@/apis/comment/useDeleteComment.ts";
import CommentListItemSkeleton from "@/components/Skelton/CommentListItemSkeleton";
import ThreadDetailItemSkeleton from "@/components/Skelton/ThreaDetailItemSkeleton";
import ThreadError from "@/components/Error/thread/ThreadError";

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
  improvements: "개선 사항",
  chat: "잡담",
};

const ThreadDetailView = ({ threadId, onClose, className }: Props) => {
  const { user } = useGetUserInfo();
  const { thread, isPending, isError, refetch } = useGetThread(threadId);

  const { deleteComment } = useDeleteComment({ threadId, channelId: thread?.channel._id });

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
        "flex h-screen min-w-500pxr max-w-500pxr list-none flex-col overflow-auto border-l border-layer-7 bg-layer-1 px-4 py-5 shadow-xl",
        className,
      )}
    >
      {isError && <ThreadError refetch={refetch} className="h-full" />}
      {!isError && (
        <div>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-content-3">스레드</h2>
              {thread && (
                <p className="text-sm text-content-1">#{channelMap[thread.channel?.name]}게시판</p>
              )}
            </div>
            <button onClick={onClose}>
              <XIcon className="text-content-1" />
            </button>
          </div>
          {isPending && <ThreadDetailItemSkeleton />}
          {thread && (
            <ThreadListItem thread={thread} channelId={thread.channel?._id} isThreadDetail={true} />
          )}
          <div className="mx-2 flex items-center gap-2">
            <span className="text-content-1">{thread?.comments?.length}개의 댓글</span>
            <hr className="h-0 flex-1 border-0 border-b-[1px] border-layer-6" />
          </div>

          <div className="mb-4">
            <ol className="flex flex-col gap-4">
              {isPending && (
                <CommentListItemSkeleton commentsCount={thread?.comments.length || 2} />
              )}
              {thread &&
                thread.comments?.map((comment) => (
                  <CommentListItem
                    key={comment._id}
                    commentInfo={comment}
                    onClose={handleDeleteComment}
                    isAuthor={comment.author._id === user?._id}
                    profileImage={comment.author.image}
                  />
                ))}
            </ol>
          </div>

          <div className="w-full pl-2 pr-2">
            {thread && (
              <EditorTextArea
                isMention={true}
                nickname={thread.nickname}
                editorProps={{
                  channelId: thread.channel._id,
                  channelName: thread.channel.name,
                  postId: thread._id,
                  postAuthorId: thread.author?._id,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadDetailView;
