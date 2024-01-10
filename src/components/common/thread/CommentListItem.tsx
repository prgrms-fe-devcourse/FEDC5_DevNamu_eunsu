import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";
import { parseTitleOrComment } from "@/utils/parsingJson";

import { Comment } from "@/types/thread";

interface Props {
  commentInfo: Comment;
}

/**
 * 일관성 유지를 위해 ThreadListItem의 기능을 단순히 제거한 버전으로 스타일의 변경은 없는 코드이다.
 * 컴포넌트 통합 혹은 중복 코드 제거 등의 책임은 ThreadListItem 작성자에게 있다.
 */
const CommentListItem = ({ commentInfo }: Props) => {
  const { createdAt, comment } = commentInfo;
  const { content, nickname } = parseTitleOrComment(comment);

  return (
    <li className="relative cursor-pointer px-2.5 py-5 hover:bg-gray-100">
      <div className="flex items-center">
        <Avatar className="mr-3">
          <AvatarImage src="/svg/userProfile.svg" alt="프로필" />
          <AvatarFallback>{nickname?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
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
      </div>
    </li>
  );
};

export default CommentListItem;
