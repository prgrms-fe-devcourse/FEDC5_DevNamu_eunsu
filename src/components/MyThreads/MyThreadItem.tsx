import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

import MyPost from "./MyPost";
import MyComment from "./MyComment";

interface Props {
  type: "post" | "comment";
  channel: "compliment" | "cheering" | "incompetent";
  title: string;
  createdAt: string;
  content?: string;
}

const channelMap = {
  cheering: "응원",
  compliment: "칭찬",
  incompetent: "무능",
};

const MyThreadItem = ({ title, type, channel, createdAt }: Props) => {
  const createdDate = formatDate(createdAt);

  return (
    <ul className="list-none">
      <div className="flex items-center justify-between gap-6 pt-3">
        <p className="text-sm text-muted-foreground">#{channelMap[channel]}게시판</p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      {type === "post" ? <MyPost title={title} /> : <MyComment />}
      <Separator />
    </ul>
  );
};

export default MyThreadItem;
