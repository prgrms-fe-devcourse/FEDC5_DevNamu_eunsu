import { MouseEvent, useState } from "react";
import * as Sentry from "@sentry/react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { Thread } from "@/types/thread";

import LikeToggleButton from "../LikeToggleButton";
import EditorTextArea from "../EditorTextArea";

import ThreadToolbar from "./ThreadToolbar";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useDeleteThreadLike from "@/apis/thread/useDeleteThreadLike";
import useDeleteThread from "@/apis/thread/useDeleteThread";
import useLikeThread from "@/hooks/api/useLikeThread";
import useToast from "@/hooks/common/useToast";
import LoginModal from "@/components/Layout/Modals/Login";
import RegisterModal from "@/components/Layout/Modals/Register";
import { ANONYMOUS_NICKNAME } from "@/constants/commonConstants.ts";

interface Props {
  thread: Thread;
  channelId: string;
  onClick?: (event: MouseEvent) => void;
}

const ThreadListItem = ({ thread, channelId, onClick }: Props) => {
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
  const { mutate: deleteThread } = useDeleteThread(channelId);
  const { likeAndNotify } = useLikeThread(channelId);
  const { removeLike } = useDeleteThreadLike(channelId);

  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);
  const likedByUser = likes.find((like) => like.user === user?._id);
  const isAlreadyLikedByUser = !!likedByUser;
  const { showToast } = useToast();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  console.log(comments);

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
        onActionClick: () => setLoginModalOpen(true),
        duration: 2000,
      });

      return;
    }

    if (isAlreadyLikedByUser) {
      removeLike(likedByUser._id);
      Sentry.captureMessage("ui 사용 - 좋아요 취소", "info");
    } else {
      likeAndNotify({ threadId: id, authorId: author._id });
      Sentry.captureMessage("ui 사용 - 좋아요 등록", "info");
    }
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
      className="relative cursor-pointer px-2.5 py-5 hover:bg-gray-100"
      tabIndex={0}
    >
      {editingThreadId !== id && (
        <div className="flex" onClick={onClick}>
          <Avatar className="mr-3">
            <AvatarImage src="/svg/userProfile.svg" alt="프로필" />
            <AvatarFallback>{author.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-grow">
            <div className="flex justify-between">
              <span tabIndex={0} className="text-lg font-semibold">
                {author.nickname}
              </span>
              <span tabIndex={0} className="text-gray-400">
                {formatDate(createdAt)}
              </span>
            </div>
            <div
              tabIndex={0}
              className="mb-10pxr line-clamp-3 truncate whitespace-pre-wrap pr-50pxr text-gray-500"
            >
              <b>{mentionedList && `${mentionedList} `}</b>
              {content}
            </div>
            <div className="flex items-center justify-start gap-2">
              {likes.length > 0 && (
                <LikeToggleButton
                  clicked={isAlreadyLikedByUser}
                  onClick={handleClickLikeButton}
                  numberOfLikes={likes.length}
                />
              )}

              {comments.length > 0 && (
                <div className="mb-10pxr mt-2 w-11/12 text-sm font-bold text-blue-500">
                  {comments.length} 개의 댓글
                </div>
              )}
            </div>
            {hoveredListId === id && (
              <ThreadToolbar
                authorId={author._id}
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
            isAnonymous={author.nickname === ANONYMOUS_NICKNAME}
          />
        )}
      </div>
      {!user && (
        <LoginModal
          open={isLoginModalOpen}
          toggleOpen={setLoginModalOpen}
          openRegisterModal={setRegisterModalOpen}
        />
      )}
      {!user && (
        <RegisterModal
          open={isRegisterModalOpen}
          toggleOpen={setRegisterModalOpen}
          openLoginModal={setLoginModalOpen}
        />
      )}
    </li>
  );
};

export default ThreadListItem;
