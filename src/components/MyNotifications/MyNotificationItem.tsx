import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

interface Props {
  seen: boolean;
  post?: string;
  comment?: string;
  follow?: string;
  message?: string;
  createdAt: string;
}

const MyNotificationItem = ({ comment, createdAt, seen }: Props) => {
  const createdDate = formatDate(createdAt);

  const commentBody = JSON.parse(comment);
  const { content, nickname } = commentBody;

  return (
    <li>
      <div className="flex items-center justify-between gap-6 pt-6">
        <p className="pb-1 text-sm text-muted-foreground">
          {nickname}님에게 알림이 왔어요! {seen ? "" : "(안읽음)"}
        </p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      <div className="mb-1">{content}</div>
      <Separator />
    </li>
  );
};

export default MyNotificationItem;
