import { XIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";
import { parseTitleOrComment } from "@/utils/parsingJson";

import { Comment } from "@/types/thread";

import { ANONYMOUS_NICKNAME, DEFAULT_PROFILE } from "@/constants/commonConstants";
import useToast from "@/hooks/common/useToast";

interface Props {
  commentInfo: Comment;
  onClose: (commentId: string) => void;
  isAuthor: boolean;
  profileImage: string | undefined;
}

/**
 * 일관성 유지를 위해 ThreadListItem의 기능을 단순히 제거한 버전으로 스타일의 변경은 없는 코드이다.
 * 컴포넌트 통합 혹은 중복 코드 제거 등의 책임은 ThreadListItem 작성자에게 있다.
 */
const CommentListItem = ({ commentInfo, onClose, isAuthor, profileImage }: Props) => {
  const { createdAt, comment, _id } = commentInfo;
  const { content, nickname, mentionedList } = parseTitleOrComment(comment);

  const { showToast } = useToast();

  const handleClick = () => {
    onClose(_id);

    showToast({
      message: "댓글을 삭제 중입니다.",
      duration: 800,
    });
  };

  return (
    <li className="relative flex cursor-pointer flex-col gap-1 px-2.5 py-5 hover:bg-muted">
      {isAuthor && (
        <button onClick={handleClick} className="flex justify-end ">
          <XIcon className="rounded-sm text-muted-foreground hover:bg-gray-600" />
        </button>
      )}
      <div className="flex">
        <Avatar className="mr-3">
          <AvatarImage
            src={nickname !== ANONYMOUS_NICKNAME && profileImage ? profileImage : DEFAULT_PROFILE}
            alt="프로필"
          />
          <AvatarFallback className="bg-layer-5 text-content-1">
            {nickname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-grow">
          <div className="flex justify-between">
            <span tabIndex={0} className="text-lg font-semibold">
              {nickname || "익명의 프롱이"}
            </span>
            <span tabIndex={0} className="text-content-2">
              {formatDate(createdAt)}
            </span>
          </div>
          <div tabIndex={0} className="overflow-hidden pr-50pxr text-muted-foreground">
            <b>{mentionedList}</b> {content}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommentListItem;
