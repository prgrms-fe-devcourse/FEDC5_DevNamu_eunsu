import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

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
  const createdDate = formatDate(createdAt);

  return (
    <ul className="cursor-pointer list-none hover:bg-gray-100" onClick={onClick}>
      <div className="flex items-center justify-between gap-6 pt-3">
        {channel ? (
          <p className="text-sm text-muted-foreground">#{channelMap[channel]}게시판</p>
        ) : (
          <p className="text-sm text-muted-foreground">#작성한 댓글 </p>
        )}

        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      {type === "post" ? (
        <MyPost title={title || "잘못된 데이터 입니다."} />
      ) : (
        <MyComment comment={comment || "잘못된 데이터 입니다."} />
      )}
      <Separator />
    </ul>
  );
};

export default MyThreadItem;
