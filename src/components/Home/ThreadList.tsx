import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { formatDate } from "@/utils/formatDate";

import { Thread } from "@/types/thread";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  return (
    <ul className="max-h-500pxr min-h-500pxr overflow-auto rounded-sm border border-t-0">
      {threads.map(({ _id, createdAt, title, author }) => (
        <li key={_id} className="px-10pxr py-5pxr">
          <div className="flex items-center">
            <Avatar className="mr-3">
              <AvatarImage src="/public/svg/userProfile.svg" alt="프로필" />
              <AvatarFallback>{author.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-grow">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">{author.nickname || "프롱이"}</span>
                <span className="text-gray-400">{formatDate(createdAt)}</span>
              </div>
              <div className="overflow-hidden truncate text-ellipsis pr-50pxr text-gray-500">
                {title}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThreadList;
