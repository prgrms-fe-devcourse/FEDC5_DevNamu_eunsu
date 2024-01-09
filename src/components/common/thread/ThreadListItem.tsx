import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { User } from "@/types/user";
import { Like } from "@/types/thread";

import LikeToggleButton from "../LikeToggleButton";

import ThreadToolbar from "./ThreadToolbar";

import useGetUserInfo from "@/apis/auth/useGetUserInfo";
import useDeleteThreadLike from "@/apis/thread/useDeleteThreadLike";
import usePostThreadLike from "@/apis/thread/usePostThreadLike";

interface Props {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: Like[];
  channelId: string;
}

const ThreadListItem = ({ id, content, author, createdAt, likes, channelId }: Props) => {
  const { user } = useGetUserInfo();
  const { likeThread } = usePostThreadLike(channelId);
  const { removeLike } = useDeleteThreadLike(channelId);
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);
  const likedByUser = likes.find((like) => like.user === user?._id);
  const isAlreadyLikedByUser = !!likedByUser;

  const handleMouseEnter = () => {
    setHoveredListId(id);
  };

  const handleMouseLeave = () => {
    setHoveredListId(null);
  };

  const handleClickLikeButton = () => {
    if (isAlreadyLikedByUser) removeLike(likedByUser._id);
    else likeThread(id);
  };

  return (
    <li
      key={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer px-2.5 py-5 hover:bg-gray-100"
      tabIndex={0}
    >
      <div className="flex items-center">
        <Avatar className="mr-3">
          <AvatarImage src="/svg/userProfile.svg" alt="프로필" />
          <AvatarFallback>{author.nickname?.charAt(0)}</AvatarFallback>
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
            className="mb-10pxr overflow-hidden truncate text-ellipsis pr-50pxr text-gray-500"
          >
            {content}
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
            handleClickLikeButton={handleClickLikeButton}
            className="absolute -top-6 right-6 z-10"
          />
        )}
      </div>
    </li>
  );
};

export default ThreadListItem;
