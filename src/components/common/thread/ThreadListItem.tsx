import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";
import { parseTitle } from "@/utils/parsingJson";

import { User } from "@/types/user";

import ThreadToolbar from "./ThreadToolbar";

interface Props {
  id: string;
  title: string;
  author: User;
  createdAt: string;
}

const ThreadListItem = ({ id, title, author, createdAt }: Props) => {
  const { content, nickname } = parseTitle(title);
  const [hoveredListId, setHoveredListId] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setHoveredListId(id);
  };

  const handleMouseLeave = () => {
    setHoveredListId(null);
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
          {/*TODO: 로그인/회원가입 추가시 옵셔널 삭제 예정 (2023.01.02)*/}
          <AvatarFallback>{author.nickname?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            {/* TODO: 로그인/회원가입 추가시 기본값 "프롱이" 삭제 예정 (2023.01.02)*/}
            <span tabIndex={0} className="text-lg font-semibold">
              {nickname || "익명의 프롱이"}
            </span>
            <span tabIndex={0} className="text-gray-400">
              {formatDate(createdAt)}
            </span>
          </div>
          <div
            tabIndex={0}
            className="overflow-hidden truncate text-ellipsis pr-50pxr text-gray-500"
          >
            {content}
          </div>
        </div>
        {hoveredListId === id && (
          <ThreadToolbar authorId={author._id} className="absolute -top-6 right-6 z-10" />
        )}
      </div>
    </li>
  );
};

export default ThreadListItem;
