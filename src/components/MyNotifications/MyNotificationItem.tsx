import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/utils/formatDate";

interface Props {
  key: string;
  seen: boolean;
  author: string;
  post?: string;
  comment?: string;
  follow?: string;
  message?: string;
  createdAt: string;
}

const MyNotificationItem = ({ key, seen, author, comment, createdAt }: Props) => {
  const createdDate = formatDate(createdAt);
  const parsedAuthor = JSON.parse(author);

  return (
    <li key={key}>
      <div className="flex items-center justify-between gap-6 pt-6">
        <p className="pb-1 text-sm text-muted-foreground">
          {parsedAuthor["nickname"]}님에게 알림이 왔어요
        </p>
        <p className="text-xs font-extralight">{createdDate}</p>
      </div>
      <div>{comment}</div>
      <Separator />
    </li>
  );
};

export default MyNotificationItem;
