import { formatDateFns } from "@/utils/formatDateFns";

import MyPost from "./MyPost";
import MyComment from "./MyComment";

interface Props {
  type?: "post" | "comment";
  channel?: "compliment" | "cheering" | "incompetent" | "improvements";
  title?: string;
  comment?: string;
  createdAt: string;
  content?: string;
  onClick: () => void;
}

const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
  improvements: "개선 사항 ",
};

const MyThreadItem = ({ title, type, channel, createdAt, comment, onClick }: Props) => {
  const createdDate = formatDateFns(createdAt);
  const headerText = channel ? `#${channelMap[channel]}게시판` : "#작성한 댓글";

  return (
    <ul
      className="cursor-pointer list-none border-b-[1px] border-b-layer-4 hover:bg-layer-3"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-6 pb-2 pt-5">
        <p className="text-sm text-content-1">{headerText}</p>
        <p className="text-s font-extralight text-content-2">{createdDate}</p>
      </div>
      {type === "post" ? (
        <MyPost title={title || "잘못된 데이터 입니다."} />
      ) : (
        <MyComment comment={comment || "잘못된 데이터 입니다."} />
      )}
    </ul>
  );
};

export default MyThreadItem;
