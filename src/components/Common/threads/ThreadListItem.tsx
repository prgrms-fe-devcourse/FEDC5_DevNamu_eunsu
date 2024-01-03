import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { User } from "@/types/user";

import ThreadToolbar from "@/components/Common/threads/ThreadToolbar";

interface Props {
  id: string;
  title: string;
  author: User;
  createdAt: string;
}

const ThreadListItem = ({ id, title, author, createdAt }: Props) => {
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
          <AvatarImage src="/public/svg/userProfile.svg" alt="프로필" />
          {/*TODO: 로그인/회원가입 추가시 옵셔널 삭제 예정 (2023.01.02)*/}
          <AvatarFallback>{author.nickname?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            {/* TODO:  ㄴ로그인/회원가입 추가시 기본값 "프롱이" 삭제 예정 (2023.01.02)*/}
            <span className="text-lg font-semibold">{author.nickname || "프롱이"}</span>
            <span className="text-gray-400">{formatDate(createdAt)}</span>
          </div>
          <div className="overflow-hidden truncate text-ellipsis pr-50pxr text-gray-500">
            {title}
          </div>
        </div>
        {hoveredListId === id && (
          <div className="absolute right-0 top-0 z-10">
            <ThreadToolbar />
          </div>
        )}
      </div>
    </li>
  );
};

export default ThreadListItem;