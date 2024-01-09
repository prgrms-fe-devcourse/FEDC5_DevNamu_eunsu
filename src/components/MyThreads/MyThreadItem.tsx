import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

import MyPost from "./MyPost";
import MyComment from "./MyComment";

interface Props {
  type?: "post" | "comment";
  channel?: "compliment" | "cheering" | "incompetent";
  title?: string;
  comment?: string;
  createdAt: string;
  content?: string;
  id: string;
}

const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
};

const MyThreadItem = ({ title, type, channel, createdAt, id, comment }: Props) => {
  const createdDate = formatDate(createdAt);

  return (
    <div className="list-none">
      <div className="flex items-center justify-between gap-6 pt-3">
        {type === "post" ? (
          <p className="text-sm text-muted-foreground">#{channelMap[channel]}게시판</p>
        ) : (
          <p className="text-sm text-muted-foreground">내 댓글 </p>
        )}

        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      {type === "post" ? <MyPost key={id} title={title} /> : <MyComment comment={comment} />}
      <Separator />
    </div>
  );
};

export default MyThreadItem;
