import { MouseEvent, useState } from "react";
import * as Sentry from "@sentry/react";
import { useOverlay } from "@toss/use-overlay";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { Thread } from "@/types/thread";

import LikeToggleButton from "../LikeToggleButton";
import EditorTextArea from "../EditorTextArea";

import ThreadToolbar from "./ThreadToolbar";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useDeleteThread from "@/apis/thread/useDeleteThread";
import useToggleLike from "@/hooks/api/useToggleLike";
import useToast from "@/hooks/common/useToast";
import { cn } from "@/lib/utils";
import LoginModal from "@/components/Layout/Modals/Login";
import { ANONYMOUS_NICKNAME, DEFAULT_PROFILE } from "@/constants/commonConstants";

interface Props {
  thread: Thread;
  channelId: string;
  isThreadDetail?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const ThreadListItem = ({ thread, channelId, isThreadDetail, onClick }: Props) => {
  const {
    _id: id,
    content,
    author,
    createdAt,
    likes,
    mentionedList,
    channel,
    nickname,
    comments,
  } = thread;

  const { user } = useGetUserInfo();
  const { deleteThread } = useDeleteThread(channelId);
  const { toggleLike } = useToggleLike({ channelId, threadId: id });
  const { showToast } = useToast();
  const { open } = useOverlay();

  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);

  const likeId = likes.find((like) => like.user === user?._id)?._id;

  const handleMouseEnter = () => {
    setHoveredListId(id);
  };

  const handleMouseLeave = () => {
    setHoveredListId(null);
  };

  const handleClickLikeButton = (event: MouseEvent) => {
    event.stopPropagation();

    if (!user) {
      showToast({
        message: "로그인 한 유저만 좋아요가 가능합니다.",
        actionLabel: "로그인",
        onActionClick: () => {
          open(({ isOpen, close }) => {
            return <LoginModal open={isOpen} close={close} />;
          });
        },
        duration: 2000,
      });

      return;
    }

    toggleLike(likeId);
  };

  const handleClickDeleteButton = (event: MouseEvent) => {
    event.stopPropagation();
    deleteThread(id);
    Sentry.captureMessage("ui 사용 - 스레드 삭제", "info");
  };

  const handleClickEditButton = (threadId: string) => (event: MouseEvent) => {
    event.stopPropagation();

    setEditingThreadId(threadId);
  };

  const handleCloseEditor = () => {
    setEditingThreadId(null);
  };

  return (
    <li
      key={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover:bg-layer-3 relative cursor-pointer px-2.5 py-5"
      tabIndex={0}
    >
      {editingThreadId !== id && (
        <div className="flex" onClick={onClick}>
          <Avatar className="mr-3">
            <AvatarImage
              src={
                author.nickname !== ANONYMOUS_NICKNAME && author.image
                  ? author.image
                  : DEFAULT_PROFILE
              }
              alt="프로필"
            />
            <AvatarFallback>{author.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-grow">
            <div className="flex justify-between">
              <span tabIndex={0} className="text-content-5 text-lg font-semibold">
                {author.nickname}
              </span>
              <span tabIndex={0} className="text-content-2">
                {formatDate(createdAt)}
              </span>
            </div>
            <div
              tabIndex={0}
              className={cn("text-content-5 mb-10pxr whitespace-pre-wrap pr-50pxr", {
                "line-clamp-3 truncate": !isThreadDetail,
              })}
            >
              <span className="text-content-6 font-bold">
                {mentionedList && `${mentionedList} `}
              </span>
              <span className="text-content-5">{content}</span>
            </div>
            <div className="flex items-center justify-start gap-2">
              {likes.length > 0 && (
                <LikeToggleButton
                  clicked={!!likeId}
                  onClick={handleClickLikeButton}
                  numberOfLikes={likes.length}
                />
              )}

              {comments?.length > 0 && (
                <div className="mb-10pxr mt-2 w-11/12 text-sm font-bold text-blue-500">
                  {comments?.length} 개의 댓글
                </div>
              )}
            </div>
            {hoveredListId === id && (
              <ThreadToolbar
                authorId={author?._id}
                onDelete={handleClickDeleteButton}
                handleClickLikeButton={handleClickLikeButton}
                handleClickEditButton={handleClickEditButton(id)}
                className="absolute -top-6 right-6 z-10"
              />
            )}
          </div>
        </div>
      )}

      <div>
        {editingThreadId === id && (
          <EditorTextArea
            isMention={channel.name !== "incompetent"}
            nickname={nickname}
            editorProps={{ prevContent: content, postId: id, channelId }}
            onEditClose={handleCloseEditor}
            authorNickname={author.nickname}
          />
        )}
      </div>
    </li>
  );
};

export default ThreadListItem;
