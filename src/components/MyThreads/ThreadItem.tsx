import { Separator } from "@/components/ui/separator";

export interface Props {
  type: "post" | "comment";
  channel: "응원" | "칭찬" | "무능";
  time?: string;
  content?: string;
}

const MyThreadItem = ({ type, channel, time, content }: Props) => {
  const element: {
    [type: string]: JSX.Element;
  } = {
    post: (
      <div className="mb-2 text-lg font-normal">
        안녕하세요 제가 쓴 글입니다 프롱이들 다 착해요.
      </div>
    ),
    comment: (
      <>
        <p className="text-sm text-muted-foreground">다음에 댓글 남김: {content}</p>
        <div className="mb-2 text-lg font-normal">ㅋㅋ저도요</div>
      </>
    ),
  };
  return (
    <>
      <div className="flex items-center justify-between gap-6 pt-3">
        <p className="text-sm text-muted-foreground">#{channel}게시판</p>
        <p className="text-xs font-extralight">{time ?? "오후 12:33"}</p>
      </div>
      {element[type]}
      <Separator />
    </>
  );
};

export default MyThreadItem;
