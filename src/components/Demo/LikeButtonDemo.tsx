import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeToggleButton from "../LikeToggleButton";

const LikeButtonDemoPage = () => {
  const [pressed, togglePressed] = useState(false);

  return (
    <div>
      <div className="p-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">스레드</h1>
          <h2 className="text-sm text-muted-foreground">#칭찬게시판</h2>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex gap-2">
          <Avatar className="flex items-center mt-1">
            <AvatarImage src="" alt="프로필 이미지" />
            <AvatarFallback>익프</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tighter text-gray-700 text-md">
                [5기-B] 김성빈
              </span>
              <span className="text-sm text-muted-foreground">10시간 전</span>
            </div>
            <div className="text-gray-800">좋아요 버튼 예시입니다</div>
            <LikeToggleButton
              clicked={pressed}
              handleClick={() => togglePressed(!pressed)}
              numberOfLikes={13}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeButtonDemoPage;
