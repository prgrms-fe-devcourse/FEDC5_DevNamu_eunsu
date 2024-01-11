import { MouseEvent, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { Thread } from "@/types/thread";

import LikeToggleButton from "../LikeToggleButton";

import ThreadToolbar from "./ThreadToolbar";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useDeleteThreadLike from "@/apis/thread/useDeleteThreadLike";
import useDeleteThread from "@/apis/thread/useDeleteThread";
import useLikeThread from "@/hooks/api/useLikeThread";
import useToast from "@/hooks/common/useToast";
import LoginModal from "@/components/Layout/Modals/Login";
import RegisterModal from "@/components/Layout/Modals/Register";

interface Props {
  thread: Thread;
  channelId: string;
  onClick?: (event: MouseEvent) => void;
}

const ThreadListItem = ({ thread, channelId, onClick }: Props) => {
  const { _id: id, content, author, createdAt, likes, mentionedList } = thread;

  const { user } = useGetUserInfo();
  const { likeAndNotify } = useLikeThread(channelId);
  const { removeLike } = useDeleteThreadLike(channelId);
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);
  const likedByUser = likes.find((like) => like.user === user?._id);
  const isAlreadyLikedByUser = !!likedByUser;
  const { showToast } = useToast();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const { mutate: deleteThread } = useDeleteThread(channelId);

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

    if (isAlreadyLikedByUser) removeLike(likedByUser._id);
    else likeAndNotify({ threadId: id, authorId: author._id });
  };

  const handleClickDeleteButton = (event: MouseEvent) => {
    event.stopPropagation();
    deleteThread(id);
  };

  return (
    <li
      key={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer px-2.5 py-5 hover:bg-gray-100"
      tabIndex={0}
    >
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
            className="mb-10pxr overflow-hidden truncate text-ellipsis whitespace-pre-wrap pr-50pxr text-gray-500"
          >
            <b>{mentionedList}</b> {content}
          </div>
          {likes.length > 0 && (
            <LikeToggleButton
              clicked={isAlreadyLikedByUser}
              onClick={handleClickLikeButton}
              numberOfLikes={likes.length}
            />
          )}
        </div>
        {hoveredListId === id && (
          <ThreadToolbar
            authorId={author._id}
            onDelete={handleClickDeleteButton}
            handleClickLikeButton={handleClickLikeButton}
            className="absolute -top-6 right-6"
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
