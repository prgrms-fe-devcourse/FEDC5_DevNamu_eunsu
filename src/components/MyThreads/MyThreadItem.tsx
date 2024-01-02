import { Separator } from "@/components/ui/separator";

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
  const createdTime = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="flex items-center justify-between gap-6 pt-3">
        <p className="text-sm text-muted-foreground">#{channelMap[channel]}게시판</p>
        <p className="text-xs font-extralight">{createdTime}</p>
      </div>
      {type === "post" ? <MyPost title={title} /> : <MyComment />}
      <Separator />
    </>
  );
};

export default MyThreadItem;
